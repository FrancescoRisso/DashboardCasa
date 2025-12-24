import json

from flask import Flask
from functions.constants import Room, main_rooms  # type: ignore
from functions.log import printLog  # type: ignore
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError


def current_temperatures(app: Flask, settings: dict[str, str], internal: bool) -> str:
    printLog(
        app, "Info", f"Serving {'internal' if internal else 'external'} temperatures"
    )

    try:
        SQLengine = create_engine(
            f"{settings['SQL_dialect']}://{settings['SQL_username']}:{settings['SQL_password']}@{settings['SQL_host']}/{settings['SQL_dbname']}"
        )
    except SQLAlchemyError as e:
        printLog(
            app,
            "Err",
            f"Error while connecting to the database while serving {'internal' if internal else 'external'} temperatures: {e.__dict__['orig']}",
        )
        return json.dumps("Error")
    except Exception as e:
        printLog(
            app,
            "Err",
            f"Error while connecting to the database while serving {'internal' if internal else 'external'} temperatures: {e}",
        )
        return json.dumps("Error")

    try:
        conn = SQLengine.connect()
        if internal:
            rooms = main_rooms
        else:
            rooms = [
                Room("Esterna"),
                Room("Collettore", alter="Pannello solare"),
            ]
        query = f"SELECT {','.join([room.name for room in rooms])} FROM TEMPERATURES_CURRENT"
        query_res = [float(val) for val in list(conn.execute(text(query)))[0]]

        res: list[dict[str, float | str]] = [
            {"label": rooms[i].disp_name, "value": query_res[i]}
            for i in range(len(query_res))
        ]
    except SQLAlchemyError as e:
        printLog(
            app,
            "Err",
            f"Error while querying the database while serving {'internal' if internal else 'external'} temperatures: {e.__dict__['orig']}",
        )
        return json.dumps("Error")
    except Exception as e:
        printLog(
            app,
            "Err",
            f"Error while querying the database while serving {'internal' if internal else 'external'} temperatures: {e}",
        )
        return json.dumps("Error")

    return json.dumps(res)
