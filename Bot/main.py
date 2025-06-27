from telebot import custom_filters
from Bot.loader import bot

import handlers
bot.add_custom_filter(custom_filters.StateFilter(bot))
bot.infinity_polling()

