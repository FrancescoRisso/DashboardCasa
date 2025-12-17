import requests
from flask import Flask
from functions.log import printLog  # type: ignore
from requests.auth import HTTPBasicAuth


def set_on_off(app: Flask, settings: dict[str, str], on: bool):
    printLog(app, "Info", f"Turning heating {'on' if on else 'off'}")

    requests.get(
        f"http://192.168.0.195/INCLUDE/change.cgi?changeadrx2=0100004F00B100&changetox2={0 if on else 1}",
        auth=HTTPBasicAuth(settings["username"], settings["password"]),
        headers={"Referer": "http://192.168.0.195/schema.html"},
    )
