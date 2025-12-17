import json
import logging
import subprocess

from flask import Flask, request
from functions.consumptions import consumptions_def
from functions.current_temperatures import current_temperatures
from functions.current_weather import weatherNow_def
from functions.exec_on_cmi import set_on_off
from functions.heating_status import get_heating_on_off, heating_status_def
from functions.log import printLog
from functions.schedules import (
    cron_action_def,
    get_schedules,
    override_schedules,
    update_cron,
)
from functions.weather_forecast import weatherForecast_def

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)


app = Flask(__name__)

subprocess.run(["sudo", "chmod", "777", "/var/spool/cron/crontabs"])

update_cron()

pre = ""
try:
    with open("Settings/Settings.json") as f:
        settings = json.load(f)

    for key in ["SQL", "CMI"]:
        settings[key]

    pre = "SQL/"
    for key in ["dialect", "username", "password", "host", "dbname"]:
        settings["SQL"][key]

    pre = "CMI/"
    for key in ["username", "password"]:
        settings["CMI"][key]

except Exception as e:
    missing = e.__str__().replace("'", "")
    printLog(
        app, "Err", f"Settings are missing or incomplete ({pre}{missing}): aborting"
    )
    quit(-1)


@app.route("/api/weatherNow")
def weatherNow():
    return weatherNow_def(app)


@app.route("/api/weatherForecast")
def weatherForecast():
    return weatherForecast_def(app)


@app.route("/api/tempInterna")
def tempInterna():
    return current_temperatures(app, settings["SQL"], True)


@app.route("/api/tempEsterna")
def tempEsterna():
    return current_temperatures(app, settings["SQL"], False)


@app.route("/api/heatingStatus")
def heating_status():
    return heating_status_def(app, True, settings["CMI"])


@app.route("/api/coolingStatus")
def cooling_status():
    return heating_status_def(app, False, settings["CMI"])


@app.route("/api/consumptions")
def consumptions():
    return consumptions_def(app)


@app.route("/api/schedules", methods=["GET", "POST"])
def schedules():
    if request.method == "GET":
        return get_schedules(app)

    return override_schedules(app, request.data)


@app.route("/api/cronAction", methods=["GET"])
def cron_action():
    return cron_action_def(app, settings["CMI"])


@app.route("/api/toggleHeating", methods=["GET"])
def toggle_heating():
    set_on_off(app, settings["CMI"], not get_heating_on_off(settings["CMI"]))
    return "Done"


if __name__ == "__main__":
    app.run(port=3001)
else:
    gunicorn_logger = logging.getLogger("gunicorn.error")
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
