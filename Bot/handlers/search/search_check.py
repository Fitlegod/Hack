from Bot.loader import bot
from Bot.states import States
from telebot.types import Message
from .search_result import result, clear

@bot.message_handler(state=States.search_check)
def search_check(message: Message) -> None:
    result["floor"] = message.text
    city = result['city']
    money = result['money']
    floor = result['floor']
    rooms = result['rooms']
