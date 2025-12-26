from datetime import datetime

from flask import Flask


def printLog(app: Flask, type: str, message: str):
    if type == "Err":
        app.logger.error(f"{message}")
    else:
        app.logger.info(f"{message}")
