from Bot.loader import bot
from Bot.states import States
from telebot.types import Message
from Bot.loader import collection

@bot.message_handler(state=States.search_rooms)
def search_rooms(message: Message) -> None:
    filt = {"user-id": str(message.from_user.id)}
    collection.update_one(filt, {"$set": {'price': str(message.text)}}, upsert=True)
    bot.send_message(message.chat.id, "Сколько комнат в квартире?")
    bot.set_state(message.chat.id, States.search_floor, message.chat.id)