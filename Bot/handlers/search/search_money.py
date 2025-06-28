from Bot.loader import bot
from Bot.states import States
from telebot.types import Message
from Bot.loader import collection

@bot.message_handler(state=States.search_money)
def search_money(message: Message) -> None:
    filt = {"user-id": str(message.from_user.username)}
    collection.update_one(filt, {"$set": {'city': str(message.text)}}, upsert=True)
    bot.send_message(message.chat.id, "Какая максимальная стоимость квартиры?")
    bot.set_state(message.chat.id, States.search_rooms, message.chat.id)