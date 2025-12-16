class Room:
    def __init__(
        self,
        name: str,
        heatingPage: int | None = None,
        coolingPage: int | None = None,
        alter: str | None = None,
    ) -> None:
        self.name = name
        self.__heatingPage = heatingPage
        self.__coolingPage = coolingPage
        self.__alter = alter

    def page(self, heating: bool) -> int:
        page = self.__heatingPage if heating else self.__coolingPage
        assert page is not None
        return page

    @property
    def disp_name(self) -> str:
        return self.__alter if self.__alter is not None else self.name


main_rooms: list[Room] = [
    Room("Salone", heatingPage=9, coolingPage=12),
    Room("Studio", heatingPage=7, coolingPage=10),
    Room("Camera_genitori", alter="Camera genitori", heatingPage=8, coolingPage=11),
    Room("Camera_Francesco", alter="Camera Francy", heatingPage=5, coolingPage=13),
    Room("Camera_Valentina", alter="Camera Vale", heatingPage=6, coolingPage=14),
]


FORECAST_DAYS = 4
