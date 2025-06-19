from telebot.handler_backends import StatesGroup, State

class States(StatesGroup):
    gather = State()
    search_city = State()
    search_money = State()
    search_rooms = State()
    search_floor = State()
    search_second = State()
    search_check = State()