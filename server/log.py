from datetime import datetime


def printLog(app, type, message):
	if type == "Err":
		print(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [ERR ] {message}")
	else:
		print(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [INFO] {message}")
