from Bot.loader import bot
from . import search_result
from Bot.states import States
from telebot.types import Message

@bot.message_handler(state=States.search_rooms)
def search_rooms(message: Message) -> None:
    search_result.result["money"] = message.text
    bot.send_message(message.chat.id, "Сколько комнат в квартире?")
    bot.set_state(message.chat.id, States.search_floor, message.chat.id)