import json

import requests
from flask import Flask
from functions.constants import Room, main_rooms  # type: ignore
from functions.log import printLog  # type: ignore
from lxml import etree
from requests.auth import HTTPBasicAuth


def describe_room(
    room: Room, heating: bool, settings: dict[str, str]
) -> dict[str, str | bool]:
    cmi_reader = requests.get(
        f"http://192.168.0.195/schematic_files/{room.page(heating)}.cgi",
        auth=HTTPBasicAuth(settings["username"], settings["password"]),
    )

    cmi_xml = etree.XML(f"<data>{cmi_reader.text}</data>")

    name: str = cmi_xml[8].text or ""
    target_temp: str = (cmi_xml[7].text or "").replace("Â°C", "")
    current_temp: str = (cmi_xml[5].text or "").replace("Â°C", "")
    is_on: bool = (cmi_xml[6].text or "").strip() == "ON"

    return {
        "room": name.strip(),
        "current_temp": current_temp.strip(),
        "target_temp": target_temp.strip(),
        "is_on": is_on,
    }


def get_heating_on_off(settings: dict[str, str]) -> bool:
    cmi_reader = requests.get(
        f"http://192.168.0.195/schematic_files/1.cgi",
        auth=HTTPBasicAuth(settings["username"], settings["password"]),
    )

    cmi_xml = etree.XML(f"<data>{cmi_reader.text}</data>")

    return (cmi_xml[4].attrib["changefrom"].strip()) == "0"


def heating_status_def(app: Flask, heating: bool, settings: dict[str, str]) -> str:
    printLog(app, "Info", f"Serving heating ON/OFF status")

    return json.dumps(
        {
            "activated": get_heating_on_off(settings),
            "rooms_status": [
                describe_room(room, heating, settings) for room in main_rooms
            ],
        }
    )
