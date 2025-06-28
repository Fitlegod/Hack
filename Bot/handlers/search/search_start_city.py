from telebot.types import CallbackQuery
from Bot.states import States
from Bot.loader import bot
from Bot.handlers.search.search_result import clear
from Bot.loader import db, collection

@bot.callback_query_handler(func=lambda callback: callback.data == "search")
def search_main(call: CallbackQuery) -> None:
    clear()
    bot.delete_message(call.message.chat.id, call.message.id)
    bot.delete_state(call.message.chat.id, call.message.chat.id)
    bot.send_message(call.message.chat.id, "Прошу Вас ввести по порядку следующие данные:")
    bot.send_message(call.message.chat.id, "В каком городе ищите квартиру?")
    bot.set_state(call.message.chat.id, States.search_money, call.message.chat.id)
    print("aaa")
    info = {"user-id": str(call.message.from_user.id)}
    collection.insert_one(info)
    return
