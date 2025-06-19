from loader import bot
from . import search_result
from states import States
from telebot.types import Message

@bot.message_handler(state=States.search_floor)
def search_money(message: Message) -> None:
    search_result.result["rooms"] = message.text
    bot.send_message(message.chat.id, "На каком этаже вы ищите квартиру?")
    bot.set_state(message.chat.id, States.search_check, message.chat.id)