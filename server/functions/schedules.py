from __future__ import annotations

import getpass
import json
import os
import subprocess
from datetime import datetime

from flask import Flask
from functions.constants import SCHEDULES_FILE, SCHEDULES_FOLDER  # type: ignore
from functions.exec_on_cmi import set_on_off  # type: ignore
from functions.log import printLog  # type: ignore

app_glob = None


class Schedule:
    def __init__(
        self,
        turn_on: bool,
        active: bool,
        hour: int,
        minute: int,
        paused_once: bool,
        schedule: tuple[bool, bool, bool, bool, bool, bool, bool],
    ) -> None:
        self.__turn_on = turn_on
        self.__active = active
        self.__hour = hour
        self.__minute = minute
        self.__paused_once = paused_once
        self.__schedule = schedule

    def to_obj(self) -> object:
        return {
            "turn_on": self.__turn_on,
            "active": self.__active,
            "hour": self.__hour,
            "minute": self.__minute,
            "paused_once": self.__paused_once,
            "schedule": self.__schedule,
        }

    def toJSON(self) -> str:
        return json.dumps(self.to_obj())

    @classmethod
    def parse(cls, string: str) -> Schedule:
        dict = json.loads(string)
        return cls(
            turn_on=dict["turn_on"],
            active=dict["active"],
            hour=dict["hour"],
            minute=dict["minute"],
            paused_once=dict["paused_once"],
            schedule=dict["schedule"],
        )

    def to_cron(self) -> str:
        if not self.__active and not self.__paused_once:
            return ""

        m = self.__minute
        h = self.__hour
        dom = "*"
        mon = "*"

        first_true = self.__schedule.index(True)
        last_true = len(self.__schedule) - 1 - self.__schedule[::-1].index(True)

        if all(self.__schedule):
            dow = "*"
        elif all(self.__schedule[first_true:last_true]):
            dow = f"{first_true}-{last_true}"
        else:
            dow = ",".join([f"{day}" for (day, on) in enumerate(self.__schedule) if on])

        printLog(
            app_glob,
            f"info",
            f"Building cron line: {m} {h} {dom} {mon} {dow} wget -qO- 127.0.0.1:3001/api/cronAction &> /dev/null",
        )
        return f"{m} {h} {dom} {mon} {dow} wget -qO- 127.0.0.1:3001/api/cronAction &> /dev/null\n"

    def execute_if_now(
        self,
        app: Flask,
        cur_hour: int,
        cur_min: int,
        cur_day: int,
        settings: dict[str, str],
    ) -> bool:

        if (
            cur_hour != self.__hour
            or cur_min != self.__minute
            or self.__schedule[cur_day] == False
        ):
            return False

        if not self.__active:
            if self.__paused_once:
                self.__active = True
                self.__paused_once = False

                printLog(app, "Info", "Reactivating paused rule")

                return True
            return False

        printLog(
            app,
            "Info",
            f"Executing automatic rule to turn heating {'on' if self.__turn_on else 'off'}",
        )

        set_on_off(app, settings, self.__turn_on)

        return False


def parse_schedules() -> list[Schedule]:
    if not os.path.exists(SCHEDULES_FOLDER):
        raise RuntimeError(f"Schedules folder ({SCHEDULES_FOLDER}) does not exist")

    if not os.path.exists(SCHEDULES_FILE):
        open(SCHEDULES_FILE, "w").close()
        return []

    with open(SCHEDULES_FILE, "r") as file:
        return [Schedule.parse(line) for line in file]


def get_schedules(app: Flask) -> str:
    printLog(app, "Info", f"Serving current schedules")
    return json.dumps([schedule.to_obj() for schedule in parse_schedules()])


def override_schedules(app: Flask, data: bytes):
    printLog(app, "Info", f"Overriding schedules")
    parsed = json.loads(data)
    assert isinstance(parsed, list)

    schedules: list[Schedule] = []

    for schedule_data in parsed:  # type: ignore
        assert isinstance(schedule_data, dict)
        assert isinstance(schedule_data["turn_on"], bool)
        assert isinstance(schedule_data["active"], bool)
        assert isinstance(schedule_data["hour"], int)
        assert isinstance(schedule_data["minute"], int)
        assert isinstance(schedule_data["paused_once"], bool)
        assert isinstance(schedule_data["schedule"], list)

        new_schedule = Schedule(
            turn_on=schedule_data["turn_on"],
            active=schedule_data["active"],
            hour=schedule_data["hour"],
            minute=schedule_data["minute"],
            paused_once=schedule_data["paused_once"],
            schedule=tuple(schedule_data["schedule"]),  # type: ignore
        )

        schedules.append(new_schedule)

    with open(SCHEDULES_FILE, "w") as f:
        f.write("\n".join([schedule.toJSON() for schedule in schedules]))

    update_cron(app, schedules)

    return "{}"


def cron_action_def(app: Flask, settings: dict[str, str]) -> str:
    now = datetime.now()
    day_cron_format = (now.weekday() + 1) % 7

    schedules_modified = False
    schedules = parse_schedules()

    for schedule in schedules:
        this_modified = schedule.execute_if_now(
            app, now.hour, now.minute, day_cron_format, settings
        )

        schedules_modified = schedules_modified or this_modified

    if schedules_modified:
        with open(SCHEDULES_FILE, "w") as f:
            f.write("\n".join([schedule.toJSON() for schedule in schedules]))

    return "Done"


def update_cron(app: Flask, schedules: list[Schedule] | None = None):
    schedules = schedules or parse_schedules()

    global app_glob
    app_glob = app

    for schedule in schedules:
        printLog(app, "info", f"Schedule: {schedule.toJSON()}")
        printLog(app, "info", f"Its cron: {schedule.to_cron()}")

    crons = set([schedule.to_cron() for schedule in schedules])
    cron_path = f"/var/spool/cron/crontabs/{getpass.getuser()}"

    printLog(app, "info", f"Adding lines to cronfile: {cron_path}")
    for cron in crons:
        printLog(app, "info", f"Line: {cron}")

    return
    with open(cron_path, "w") as file:
        file.write("".join([cron for cron in crons]))

    os.chmod(cron_path, 0o600)

    subprocess.run(["service", "cron", "restart"])
