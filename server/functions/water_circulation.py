import json

from flask import Flask
from functions.constants import main_rooms
from functions.log import printLog
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError


def water_circulation_def(app: Flask, settings: dict[str, str], hot_water: bool):
    printLog(app, "Info", f"Serving {'heating' if hot_water else 'cooling'} data")

    try:
        SQLengine = create_engine(
            f"{settings['dialect']}://{settings['username']}:{settings['password']}@{settings['host']}/{settings['dbname']}"
        )
    except SQLAlchemyError as e:
        printLog(
            app,
            "Err",
            f"Error while connecting to the database while serving {'heating' if hot_water else 'cooling'} data: {e.__dict__['orig']}",
        )
        return json.dumps("Error")
    except Exception as e:
        printLog(
            app,
            "Err",
            f"Error while connecting to the database while serving {'heating' if hot_water else 'cooling'} data: {e}",
        )
        return json.dumps("Error")

    try:
        conn = SQLengine.connect()

        rooms = main_rooms

        query = f"SELECT {','.join([room.name for room in rooms])}, Valvole_deviatrici FROM OUTPUTS WHERE Date = (SELECT MAX(Date) FROM OUTPUTS)"
        query_res = list(list(conn.execute(text(query)))[0])

        isOn = (not bool(query_res[-1])) if hot_water else bool(query_res[-1])

        res: list[dict[str, str | bool]] = [
            {
                "label": rooms[i].disp_name,
                "value": (bool(query_res[i]) and isOn),
                "link": f"http://192.168.0.195/schema.html#{rooms[i].page(hot_water)}",
            }
            for i in range(len(rooms))
        ]

        somethingOn: bool = False
        for room in res:
            somethingOn = somethingOn or room["value"]  # type: ignore

        res.insert(0, somethingOn)  # type: ignore

    except SQLAlchemyError as e:
        printLog(
            app,
            "Err",
            f"Error while connecting to the database while serving {'heating' if hot_water else 'cooling'} data: {e.__dict__['orig']}",
        )
        return json.dumps("Error")
    except Exception as e:
        printLog(
            app,
            "Err",
            f"Error while connecting to the database while serving {'heating' if hot_water else 'cooling'} data: {e}",
        )
        return json.dumps("Error")

    return json.dumps(res)
