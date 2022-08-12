from datetime import datetime


def printLog(app, type, request, message):
	if type == "Err":
		app.logger.error(f"{message}")
	else:
		app.logger.info(f"{request.remote_addr}: {message}")
