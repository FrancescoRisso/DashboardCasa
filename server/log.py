from datetime import datetime


def printLog(app, type, message):
	if type == "Err":
		app.logger.error(f"{message}")
	else:
		app.logger.info(f"{message}")
