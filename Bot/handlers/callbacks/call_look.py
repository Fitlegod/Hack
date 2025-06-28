from Bot.loader import bot
from telebot.types import CallbackQuery
from Bot.loader import collection
from Bot.handlers.search.search_start_city import search_main

@bot.callback_query_handler(func = lambda callback: callback.data == "look-for")
def look_for(call: CallbackQuery) -> None:
    user = collection.find_one({'user-id': call.from_user.username})
    filt = {}
    if str(user['rooms']).isdigit():
        if int(user['rooms']) > 0:
            filt['rooms'] = user['rooms']
    if str(user['city']).isalpha():
        filt['city'] = user['city']
    if str(user['money']).isdigit():
        filt['money'] = {'money': {'$lt', int(user['money'])}}
    if str(user['floor']).isdigit():
        if int(user['floor']) > 0:
            filt['floor'] = user['floor']
    if filt != {}:
        print(filt)
        search_main(call)