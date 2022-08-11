from datetime import datetime


def printLog(app, type, request, message):
	if type == "Err":
		# Error log
		app.logger.error((f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [ERR ] {message}")
	else:
		# Info log
		app.logger.info((f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [INFO] {request.remote_addr}: {message}")
