import json
from operator import itemgetter
from urllib.request import Request, urlopen

from flask import Flask
from functions.log import printLog
from lxml import etree


def consumptions_def(app: Flask) -> str:
    printLog(app, "Info", "Serving consumptions data")

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
        values: dict[str, float] = {}

        for name, index in sources.items():

            page = urlopen(
                Request(f"http://192.168.0.6/istval_0{index}00.xml", headers={})
            )
            page = page.read().decode("utf-8")
            page = etree.XML(page)
            values[name] = int(page[1].text) / 1000  # type: ignore

        values[totalConsumptionName] = (
            values[downstairsName] + values[wallBoxName] + values[upstairsName]
        )
        values["Immessa in rete"] = (
            values[solarPanelName] - values[totalConsumptionName]
        )

        res: list[dict[str, str | float]] = [
            {"label": key, "value": val} for (key, val) in values.items()
        ]
        res.sort(key=itemgetter("label"))

        return json.dumps(res)

    except Exception as e:
        printLog(app, "Err", f"Error in serving consumptions data: {e}")
        return "Error"
