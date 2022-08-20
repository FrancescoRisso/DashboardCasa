import json
from operator import itemgetter
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from urllib.request import Request, urlopen
from lxml import etree
from flask import Flask, Response, request
from log import printLog

import logging

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)


DAYS = 4

app = Flask(__name__)

try:
	with open("SQLsettings.json") as f:
		settings = json.load(f)
	for key in ["dialect", "username", "password", "host", "dbname"]:
		settings[key]
except Exception as e:
	printLog(app, "Err", None, f"SQL settings are missing or incomplete ({e}): aborting")
	quit(-1)

mainRooms = [
	{"room": "Salone", "heatingPage": 9, "coolingPage": 12},
	{"room": "Studio", "heatingPage": 7, "coolingPage": 10},
	{"room": "Camera_genitori", "alter": "Camera genitori", "heatingPage": 8, "coolingPage": 11},
	{"room": "Camera_Francesco", "alter": "Camera Francy", "heatingPage": 5, "coolingPage": 13},
	{"room": "Camera_Valentina", "alter": "Camera Vale", "heatingPage": 6, "coolingPage": 14},
]


@app.route("/api/weatherNow")
def weatherNow():
	printLog(app, "Info", request, "Serving current weather")

	try:
		page = urlopen(
			"https://weather.com/it-IT/weather/today/l/e256c2aae80f726e762e14af45d2afe36111106461810a2161276ae9c564f200"
		)
		page = page.read().decode("utf-8")
		page = etree.HTML(page)

		svg = page.xpath("//div[contains(@class,'CurrentConditions--secondary')]//*[name()='svg']")[0]
		svg = etree.tostring(svg, pretty_print=True).decode("utf-8")

		temp = page.xpath("//span[contains(@class,'CurrentConditions--tempValue')]/text()")[0]

		return json.dumps({"icon": svg, "temperature": temp})

	except Exception as e:
		printLog(app, "Err", None, f"Error while serving current weather: {e}")
		return json.dumps("Error")


@app.route("/api/weatherForecast")
def weatherForecast():
	printLog(app, "Info", request, "Serving weather forecasts")
	try:
		page = urlopen(
			"https://weather.com/it-IT/weather/today/l/e256c2aae80f726e762e14af45d2afe36111106461810a2161276ae9c564f200"
		)

		page = page.read().decode("utf-8")
		page = etree.HTML(page)

		forecasts = []

		for i in range(2, DAYS + 2):
			icon = page.xpath(f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[2]/a//*[name()='svg'][1]")[0]
			icon = etree.tostring(icon, pretty_print=True).decode("utf-8")

			day = (
				page.xpath(f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a/h3/span/text()")[0]
				.split(" ")[0]
				.capitalize()
			)

			minTemp = page.xpath(
				f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a/div[@data-testid = 'SegmentLowTemp']/span/text()"
			)[0]

			maxTemp = page.xpath(
				f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a/div[@data-testid = 'SegmentHighTemp']/span/text()"
			)[0]

			forecast = {"day": day, "icon": icon, "minTemp": minTemp, "maxTemp": maxTemp}
			forecasts.append(forecast)

		return Response(json.dumps(forecasts), mimetype="application/json")

	except Exception as e:
		printLog(app, "Err", None, f"Error while serving weather forecasts: {e}")
		return json.dumps("Error")


@app.route("/api/tempInterna")
def tempInterna():
	printLog(app, "Info", request, "Serving internal temperatures")
	return temperatures(True)


@app.route("/api/tempEsterna")
def tempEsterna():
	printLog(app, "Info", request, "Serving external temperatures")
	return temperatures(False)


def temperatures(internal):
	try:
		SQLengine = create_engine(
			f"{settings['dialect']}://{settings['username']}:{settings['password']}@{settings['host']}/{settings['dbname']}"
		)
	except SQLAlchemyError as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while connecting to the database while serving {'internal' if internal else 'external'} temperatures: {e.__dict__['orig']}",
		)
		return json.dumps("Error")
	except Exception as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while connecting to the database while serving {'internal' if internal else 'external'} temperatures: {e}",
		)
		return json.dumps("Error")

	try:
		conn = SQLengine.connect()
		if internal:
			rooms = mainRooms
		else:
			rooms = [{"room": "Esterna"}, {"room": "Collettore", "alter": "Pannello solare"}]
		query = f"SELECT {','.join([room['room'] for room in rooms])} FROM TEMPERATURES_CURRENT"
		res = list(list(conn.execute(query))[0])
		res = [
			{"label": rooms[i]["alter"] if "alter" in rooms[i] else rooms[i]["room"], "value": float(res[i])}
			for i in range(len(res))
		]
	except SQLAlchemyError as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while querying the database while serving {'internal' if internal else 'external'} temperatures: {e.__dict__['orig']}",
		)
		return json.dumps("Error")
	except Exception as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while querying the database while serving {'internal' if internal else 'external'} temperatures: {e}",
		)
		return json.dumps("Error")

	return json.dumps(res)


@app.route("/api/Raffrescamento")
def raffrescamento():
	printLog(app, "Info", request, "Serving cooling data")
	return circolazioneAcqua(False)


@app.route("/api/Riscaldamento")
def riscaldamento():
	printLog(app, "Info", request, "Serving heating data")
	return circolazioneAcqua(True)


def circolazioneAcqua(calda):
	try:
		SQLengine = create_engine(
			f"{settings['dialect']}://{settings['username']}:{settings['password']}@{settings['host']}/{settings['dbname']}"
		)
	except SQLAlchemyError as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while connecting to the database while serving {'heating' if calda else 'cooling'} data: {e.__dict__['orig']}",
		)
		return json.dumps("Error")
	except Exception as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while connecting to the database while serving {'heating' if calda else 'cooling'} data: {e}",
		)
		return json.dumps("Error")

	try:
		conn = SQLengine.connect()

		rooms = mainRooms

		query = f"SELECT {','.join([room['room'] for room in rooms])}, Valvole_deviatrici FROM OUTPUTS WHERE Date = (SELECT MAX(Date) FROM OUTPUTS)"
		res = list(list(conn.execute(query))[0])

		isOn = (not bool(res[-1])) if calda else bool(res[-1])

		res = [
			{
				"label": rooms[i]["alter"] if "alter" in rooms[i] else rooms[i]["room"],
				"value": (bool(res[i]) and isOn),
				"link": f"http://192.168.0.195/schema.html#{rooms[i]['heatingPage' if calda else 'coolingPage' ]}",
			}
			for i in range(len(rooms))
		]

		somethingOn = False
		for room in res:
			somethingOn = somethingOn or room["value"]

		res.insert(0, somethingOn)

	except SQLAlchemyError as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while connecting to the database while serving {'heating' if calda else 'cooling'} data: {e.__dict__['orig']}",
		)
		return json.dumps("Error")
	except Exception as e:
		printLog(
			app,
			"Err",
			None,
			f"Error while connecting to the database while serving {'heating' if calda else 'cooling'} data: {e}",
		)
		return json.dumps("Error")

	return json.dumps(res)


@app.route("/api/consumptions")
def consumptions():
	printLog(app, "Info", request, "Serving consumptions data")

	downstairsName = "Seminterrato"
	wallBoxName = "Wallbox"
	upstairsName = "Abitazione"
	solarPanelName = "Produzione fotovoltaico"
	totalConsumptionName = "Consumo totale"

	sources = {
		"Comprata dall'ENEL": 0,
		upstairsName: 1,
		downstairsName: 2,
		"PdC riscaldamento": 3,
		"PdC sanitaria": 4,
		solarPanelName: 5,
		wallBoxName: 6,
		"Fornelli": 7,
		"Forno": 8,
	}

	try:
		values = {}

		for (name, index) in sources.items():

			page = urlopen(Request(f"http://192.168.0.6/istval_0{index}00.xml", headers={}))
			page = page.read().decode("utf-8")
			page = etree.XML(page)
			values[name] = int(page[1].text) / 1000

		values[totalConsumptionName] = values[downstairsName] + values[wallBoxName] + values[upstairsName]
		values["Immessa in rete"] = values[solarPanelName] - values[totalConsumptionName]

		res = [{"label": key, "value": val} for (key, val) in values.items()]
		res.sort(key=itemgetter("label"))

		return json.dumps(res)

	except Exception as e:
		printLog(app, "Err", None, f"Error in serving consumptions data: {e}")
		return "Error"


if __name__ == "__main__":
	app.run(port=3001)
else:
	gunicorn_logger = logging.getLogger("gunicorn.error")
	app.logger.handlers = gunicorn_logger.handlers
	app.logger.setLevel(gunicorn_logger.level)
