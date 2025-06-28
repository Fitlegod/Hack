from Bot.loader import bot
from Bot.states import States
from telebot.types import Message
from Bot.keyboards.inline.check_keyboard import check_keyboard
from Bot.loader import collection

@bot.message_handler(state=States.search_check)
def search_check(message: Message) -> None:
    filt = {"user-id": str(message.from_user.id)}
    collection.update_one(filt, {"$set": {'floor': str(message.text)}}, upsert=True)
    params = collection.find_one(filt)
    print(params)
    city = params['city']
    money = params['money']
    floor = params['floor']
    rooms = params['rooms']
    bot.send_message(message.chat.id, f"Проверьте, правильно ли вы ввели параметры: \n"
                                      f"Город: {city},\n"
                                      f"Этаж: {floor},\n"
                                      f"Количество комнат: {rooms},\n"
                                      f"Максимальная цена: {money}",
                     reply_markup=check_keyboard())

