from Bot.loader import bot
from telebot.types import CallbackQuery
from Bot.handlers.search.search_result import result

@bot.callback_query_handler(func = lambda callback: callback.data == "look-for")
def look_for(call: CallbackQuery) -> None:
    return