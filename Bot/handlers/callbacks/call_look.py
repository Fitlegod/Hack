from Bot.loader import bot
from telebot.types import CallbackQuery
from Bot.loader import collection, collection_b
from Bot.handlers.search.search_start_city import search_main


@bot.callback_query_handler(func = lambda callback: callback.data == "look-for")
def look_for(call: CallbackQuery) -> None:
    user = collection.find_one({'user-id': call.from_user.username})
    filt = []
    if str(user['rooms']).isdigit():
        if int(user['rooms']) > 0:
            filt.append({'rooms': int(user['rooms'])})
    if str(user['city']).isalpha():
        filt.append({'city': str(user['city'])})
    if str(user['price']).isdigit():
        filt.append({'price': {'$lt': int(user['price'])}})
    if str(user['floor']).isdigit():
        if int(user['floor']) > 0:
            filt.append({'floor': int(user['floor'])})
    if filt != []:
        print(filt)
        search_main(call)
    for x in collection_b.find({'$and':filt}):
        if x['_id'] in user['seen']:
            continue
        else:
            bot.send_message(call.message.chat.id, x['link'])
            print(x['link'])
            collection.update_one({'user-id': call.from_user.username}, {'$push': {'seen': x['_id']}})