class Room:
    def __init__(
        self,
        name: str,
        heatingPage: int | None = None,
        heatingCode: str | None = None,
        coolingPage: int | None = None,
        coolingCode: str | None = None,
        alter: str | None = None,
    ) -> None:
        self.name = name
        self.__heatingPage = heatingPage
        self.__heatingCode = heatingCode
        self.__coolingPage = coolingPage
        self.__coolingCode = coolingCode
        self.__alter = alter

    def page(self, heating: bool) -> int:
        page = self.__heatingPage if heating else self.__coolingPage
        assert page is not None
        return page

    def code(self, heating: bool) -> str:
        code = self.__heatingCode if heating else self.__coolingCode
        assert code is not None
        return code

    @property
    def disp_name(self) -> str:
        return self.__alter if self.__alter is not None else self.name


main_rooms: list[Room] = [
    Room(
        "Salone",
        heatingPage=9,
        coolingPage=12,
        heatingCode="2200024B2FD101",
        coolingCode="2200074B2FD101",
    ),
    Room(
        "Studio",
        heatingPage=7,
        coolingPage=10,
        heatingCode="2200004B2FD101",
        coolingCode="2200054B2FD101",
    ),
    Room(
        "Camera_genitori",
        alter="Camera genitori",
        heatingPage=8,
        coolingPage=11,
        heatingCode="2200014B2FD101",
        coolingCode="2200064B2FD101",
    ),
    Room(
        "Camera_Francesco",
        alter="Camera Francy",
        heatingPage=5,
        coolingPage=13,
        heatingCode="2100004B2FD101",
        coolingCode="2100044B2FD101",
    ),
    Room(
        "Camera_Valentina",
        alter="Camera Vale",
        heatingPage=6,
        coolingPage=14,
        heatingCode="2100014B2FD101",
        coolingCode="2100054B2FD101",
    ),
]


FORECAST_DAYS = 4


SCHEDULES_FOLDER = "./schedules"
SCHEDULES_FILE = f"{SCHEDULES_FOLDER}/config.txt"
