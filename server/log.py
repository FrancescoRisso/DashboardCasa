from datetime import datetime


def printLog(app, type, request, message):
	if type == "Err":
		# Error log
		print(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [ERR ] {message}")
	else:
		# Info log
		print(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} [INFO] {request.remote_addr}: {message}")
