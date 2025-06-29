from Bot.loader import bot, collection, collection_b
from telebot.types import CallbackQuery
from .call_look import look_for

@bot.callback_query_handler(func= lambda callback: callback.data == "look-for-save")
def look_for_save(call: CallbackQuery) -> None:
    user = collection.find_one({'user-id': call.from_user.username})
    collection.update_one({'user-id': user['user-id']}, {"$push": {'saved': user['last-seen']}}, upsert=True)
    look_for(call)
    return