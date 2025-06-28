from Bot.loader import bot
from Bot.states import States
from telebot.types import Message
from .search_result import result
from Bot.keyboards.inline.check_keyboard import check_keyboard

@bot.message_handler(state=States.search_check)
def search_check(message: Message) -> None:
    result["floor"] = message.text
    city = result['city']
    money = result['money']
    floor = result['floor']
    rooms = result['rooms']
    bot.send_message(message.chat.id, f"Проверьте, правильно ли вы ввели параметры: \n"
                                      f"Город: {city},\n"
                                      f"Этаж: {floor},\n"
                                      f"Количество комнат: {rooms},\n"
                                      f"Максимальная цена: {money}",
                     reply_markup=check_keyboard())

