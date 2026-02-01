import json
from urllib.request import Request, urlopen

import requests
from flask import Flask
from functions.log import printLog  # type: ignore
from lxml import etree


def get_from_btcino(index: int) -> str | float:
    page = urlopen(Request(f"http://192.168.0.6/istval_0{index}00.xml", headers={}))
    page = page.read().decode("utf-8")
    page = etree.XML(page)

    return int(page[1].text) / 1000  # type: ignore


def bticino_consumptions_def(app: Flask) -> str:
    printLog(app, "Info", "Serving Bticino consumptions data")

    values: dict[str, float | str] = {}

    try:
        # values["Comprata dall'ENEL"] = get_from_btcino(0)
        values["Abitazione"] = get_from_btcino(1)
        values["Seminterrato"] = get_from_btcino(2)
        values["PdC riscaldamento"] = get_from_btcino(3)
        values["PdC sanitaria"] = get_from_btcino(4)
        # values["Produzione fotovoltaico"] = get_from_btcino(5)
        values["Wallbox"] = get_from_btcino(6)
        values["Fornelli"] = get_from_btcino(7)
        values["Forno"] = get_from_btcino(8)

        # values["Consumo totale"] = values["Abitazione"] + values["Seminterrato"] + values["Wallbox"]
        # values["Immessa in rete"] = values["Produzione fotovoltaico"] - values["Consumo totale"]

        return json.dumps(values)

    except Exception as e:
        printLog(app, "Err", f"Error in serving Bticino consumptions data: {e}")
        return "Error"


def insert_based_on_sign(
    values: dict[str, float | str], val: int, name_pos: str, name_neg: str
):
    if val > 0:
        values[name_pos] = val
    else:
        values[name_neg] = -val


def fronius_consumptions_def(app: Flask) -> str:
    printLog(app, "Info", "Serving Fronius consumptions data")

    values: dict[str, float | str] = {}

    try:
        INVERTER = "192.168.0.241"
        URL = f"http://{INVERTER}/solar_api/v1/GetPowerFlowRealtimeData.fcgi"

        response = requests.get(URL, timeout=2)
        response.raise_for_status()
        fronius_data = response.json()["Body"]["Data"]

        values["Prodotta fotovoltaico"] = fronius_data["Site"]["P_PV"] / 1000
        values["Consumo totale"] = -fronius_data["Site"]["P_Load"] / 1000
        values["Stato di carica della batteria"] = fronius_data["Inverters"]["1"]["SOC"]

        enel = fronius_data["Site"]["P_Grid"] / 1000
        insert_based_on_sign(values, enel, "Comprata da rete", "Venduta in rete")

        batt = fronius_data["Site"]["P_Akku"] / 1000
        insert_based_on_sign(values, batt, "Immessa in batteria", "Consumo da batteria")

        return json.dumps(values)

    except Exception as e:
        printLog(app, "Err", f"Error in serving Fronius consumptions data: {e}")
        return "Error"
