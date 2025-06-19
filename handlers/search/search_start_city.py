from telebot.types import CallbackQuery
import states

from loader import bot

@bot.callback_query_handler(func=lambda callback: callback.data == "search")
def search_main(call: CallbackQuery) -> None:
    bot.send_message(call.message.chat.id, "Прошу Вас ввести по порядку следующие данные:")
    bot.send_message(call.message.chat.id, "В каком городе ищите квартиру?")
    bot.set_state(call.message.chat.id, states.States.search_money, call.message.chat.id)
    return