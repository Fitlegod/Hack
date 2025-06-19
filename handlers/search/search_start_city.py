from telebot.types import CallbackQuery, Message
import states
from loader import bot
from .search_result import clear

@bot.callback_query_handler(func=lambda callback: callback.data == "search")
def search_main(call: CallbackQuery) -> None:
    clear()
    bot.delete_state(call.message.chat.id, call.message.chat.id)
    bot.send_message(call.message.chat.id, "Прошу Вас ввести по порядку следующие данные:")
    bot.send_message(call.message.chat.id, "В каком городе ищите квартиру?")
    bot.set_state(call.message.chat.id, states.States.search_money, call.message.chat.id)
    return
