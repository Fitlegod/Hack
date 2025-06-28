from Bot.loader import bot
from Bot.states import States
from telebot.types import Message
from Bot.loader import collection
from Bot.command_list import comms

@bot.message_handler(state=States.search_floor, func=lambda mess: mess.text not in comms)
def search_money(message: Message) -> None:
    filt = {"user-id": str(message.from_user.username)}
    collection.update_one(filt, {"$set": {'rooms': str(message.text)}}, upsert=True)
    bot.send_message(message.chat.id, "На каком этаже вы ищите квартиру?")
    bot.set_state(message.chat.id, States.search_check, message.chat.id)