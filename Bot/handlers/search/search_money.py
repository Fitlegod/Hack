from Bot.loader import bot
from . import search_result
from Bot.states import States
from telebot.types import Message

@bot.message_handler(state=States.search_money)
def search_money(message: Message) -> None:
    search_result.result["city"] = message.text
    bot.send_message(message.chat.id, "Какая максимальная стоимость квартиры?")
    bot.set_state(message.chat.id, States.search_rooms, message.chat.id)