from telebot import custom_filters
from Bot.loader import bot
import handlers
from pymongo import MongoClient


bot.add_custom_filter(custom_filters.StateFilter(bot))
bot.infinity_polling()

