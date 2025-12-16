import json
from urllib.request import urlopen

from flask import Flask
from functions.log import printLog
from lxml import etree


def weatherNow_def(app: Flask) -> str:
    printLog(app, "Info", "Serving current weather")

    try:
        page = urlopen(
            "https://weather.com/it-IT/weather/today/l/e256c2aae80f726e762e14af45d2afe36111106461810a2161276ae9c564f200"
        )
        page = page.read().decode("utf-8")
        page = etree.HTML(page)

        svg = page.xpath(
            "//div[contains(@class,'CurrentConditions--secondary')]//*[name()='svg']"
        )[0]
        svg = etree.tostring(svg, pretty_print=True).decode("utf-8")

        temp = page.xpath(
            "//span[contains(@class,'CurrentConditions--tempValue')]/text()"
        )[0]

        return json.dumps({"icon": svg, "temperature": temp})

    except Exception as e:
        printLog(app, "Err", f"Error while serving current weather: {e}")
        return json.dumps("Error")
