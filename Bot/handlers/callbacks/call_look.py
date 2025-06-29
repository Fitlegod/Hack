from Bot.loader import bot
from telebot.types import CallbackQuery
from Bot.loader import collection, collection_b
from Bot.handlers.commands.start import start
from Bot.keyboards.inline.look_keyboard import look_keyboard


@bot.callback_query_handler(func = lambda callback: callback.data == "look-for")
def look_for(call: CallbackQuery) -> None:
    bot.delete_message(call.message.chat.id, call.message.id)
    user = collection.find_one({'user-id': call.from_user.username})
    filt = []
    if str(user['rooms']).isdigit():
        if int(user['rooms']) > 0:
            filt.append({'parameters.rooms': int(user['rooms'])})
    if str(user['city']).isalpha():
        filt.append({'address.city': str(user['city'])})
    if str(user['price']).isdigit():
        if int(user['price']) >0:
            filt.append({'parameters.price': {'$lt': int(user['price'])}})
    if str(user['floor']).isdigit():
        if int(user['floor']) > 0:
            filt.append({'parameters.floor': int(user['floor'])})
    if filt:
        print(filt)
        filt = {'$and':filt}
    print(filt)
    found = collection_b.find(filt)
    num = 0
    for x in collection_b.find(filt):
        num+= 1
    print(num, " ", len(list(found)))
    if num or len(list(found)):
        for x in collection_b.find(filt):
            if x['_id'] not in user['seen']:
                print(x)
                collection.update_one({'user-id': call.from_user.username}, {'$set': {'last_seen': x['_id']}})
                bot.send_message(call.message.chat.id, f"{x['title']}:\n"
                                                           f"Класс дома: {x['housingClass']}\n"
                                                           f"Адрес: {x['address']['city']}, ул. {x['address']['street']}\n"
                                                           f"Площадь: {x['parameters']['area']}м²\n"
                                                           f"Цена: {x['parameters']['price']}р.\n"
                                                           f"Описание: {x['description']}",
                                     reply_markup=look_keyboard())
                collection.update_one({'user-id': call.from_user.username}, {'$push': {'seen': x['_id']}})
                break
        else:
            bot.send_message(call.message.chat.id,"Вы посмотрели все квартиры по даннму запросу!")
            start(call.message)
    else:
        bot.send_message(call.message.chat.id, "Вы посмотрели все по даннму запросу!")
        start(call.message)