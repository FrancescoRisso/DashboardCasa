import requests
from flask import Flask
from functions.constants import main_rooms
from functions.log import printLog  # type: ignore
from requests.auth import HTTPBasicAuth


def set_on_off(app: Flask, settings: dict[str, str], on: bool):
    printLog(app, "Info", f"Turning heating {'on' if on else 'off'}")

    requests.get(
        f"http://192.168.0.195/INCLUDE/change.cgi?changeadrx2=0100004F00B100&changetox2={0 if on else 1}",
        auth=HTTPBasicAuth(settings["CMI_username"], settings["CMI_password"]),
        headers={"Referer": "http://192.168.0.195/schema.html"},
    )


def change_temperature(
    app: Flask,
    settings: dict[str, str],
    room_id: int,
    temperature: float,
    heating: bool,
):
    room = main_rooms[room_id]

    function = "heating" if heating else "cooling"
    address = room.code(heating)

    printLog(
        app,
        "Info",
        f"Setting target temperature for {function} room '{room.disp_name}' to {temperature}",
    )

    requests.get(
        f"http://192.168.0.195/INCLUDE/change.cgi?changeadrx2={address}&changetox2={temperature}",
        auth=HTTPBasicAuth(settings["CMI_username"], settings["CMI_password"]),
        headers={"Referer": "http://192.168.0.195/schema.html"},
    )
