from Bot.loader import bot
from telebot.types import CallbackQuery
from Bot.loader import collection, collection_b
from Bot.handlers.commands.start import start
from Bot.handlers.search.search_start_city import search_main
from Bot.keyboards.inline.look_keyboard import look_keyboard


@bot.callback_query_handler(func = lambda callback: callback.data == "look-for")
def look_for(call: CallbackQuery) -> None:
    user = collection.find_one({'user-id': call.from_user.username})
    filt = []
    if str(user['rooms']).isdigit():
        if int(user['rooms']) > 0:
            filt.append({'rooms': int(user['rooms'])})
    if str(user['city']).isalpha():
        filt.append({'address':{'city': str(user['city'])}})
    if str(user['price']).isdigit():
        if int(user['price']) >0:
            filt.append({'price': {'$lt': int(user['price'])}})
    if str(user['floor']).isdigit():
        if int(user['floor']) > 0:
            filt.append({'floor': int(user['floor'])})
    if filt:
        print(filt)
        search_main(call)
        filt = {'$and':filt}
    print(filt)
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
        bot.send_message(call.message.chat.id,"Отсутствуют не просмотренные квартиры по даннму запросу!")
        start(call.message)