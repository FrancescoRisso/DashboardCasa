import json
from urllib.request import urlopen

from flask import Flask, Response
from functions.constants import FORECAST_DAYS
from functions.log import printLog
from lxml import etree


def weatherForecast_def(app: Flask) -> str | Response:
    printLog(app, "Info", "Serving weather forecasts")
    try:
        page = urlopen(
            "https://weather.com/it-IT/weather/today/l/e256c2aae80f726e762e14af45d2afe36111106461810a2161276ae9c564f200"
        )

        page = page.read().decode("utf-8")
        page = etree.HTML(page)

        forecasts: list[dict[str, str]] = []

        for i in range(2, FORECAST_DAYS + 2):
            icon = page.xpath(
                f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a//*[name()='svg'][1]"
            )[0]
            icon: str = etree.tostring(icon, pretty_print=True).decode("utf-8")  # type: ignore

            day: str = (  # type: ignore
                page.xpath(
                    f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a/h3/span/text()"
                )[0]
                .split(" ")[0]
                .capitalize()
            )

            minTemp: str = page.xpath(  # type: ignore
                f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a/div[@data-testid = 'SegmentLowTemp']/span/text()"
            )[0]

            maxTemp: str = page.xpath(  # type: ignore
                f"//div[contains(@id,'DailyWeatherCard')]//div/ul/li[{i}]/a/div[@data-testid = 'SegmentHighTemp']/span/text()"
            )[0]

            forecast: dict[str, str] = {  # type: ignore
                "day": day,
                "icon": icon,
                "minTemp": minTemp,
                "maxTemp": maxTemp,
            }
            forecasts.append(forecast)

        return Response(json.dumps(forecasts), mimetype="application/json")

    except Exception as e:
        printLog(app, "Err", f"Error while serving weather forecasts: {e}")
        return json.dumps("Error")
