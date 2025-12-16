import json
import logging

from flask import Flask
from functions.consumptions import consumptions_def
from functions.current_temperatures import current_temperatures
from functions.current_weather import weatherNow_def
from functions.log import printLog
from functions.water_circulation import water_circulation_def
from functions.weather_forecast import weatherForecast_def

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)


app = Flask(__name__)

try:
    with open("SQLsettings/SQLsettings.json") as f:
        settings = json.load(f)
    for key in ["dialect", "username", "password", "host", "dbname"]:
        settings[key]
except Exception as e:
    printLog(app, "Err", f"SQL settings are missing or incomplete ({e}): aborting")
    quit(-1)


@app.route("/api/weatherNow")
def weatherNow():
    return weatherNow_def(app)


@app.route("/api/weatherForecast")
def weatherForecast():
    return weatherForecast_def(app)


@app.route("/api/tempInterna")
def tempInterna():
    return current_temperatures(app, settings, True)


@app.route("/api/tempEsterna")
def tempEsterna():
    return current_temperatures(app, settings, False)


@app.route("/api/Raffrescamento")
def raffrescamento():
    return water_circulation_def(app, settings, False)


@app.route("/api/Riscaldamento")
def riscaldamento():
    return water_circulation_def(app, settings, True)


@app.route("/api/consumptions")
def consumptions():
    return consumptions_def(app)


if __name__ == "__main__":
    app.run(port=3001)
else:
    gunicorn_logger = logging.getLogger("gunicorn.error")
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
