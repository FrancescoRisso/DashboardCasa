from datetime import datetime

from flask import Flask


def printLog(app: Flask, type: str, message: str):
    if type == "Err":
        print(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [ERR ] {message}")
    else:
        print(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [INFO] {message}")
