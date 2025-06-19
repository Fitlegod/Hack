from telebot import custom_filters
from loader import bot

bot.add_custom_filter(custom_filters.StateFilter(bot))
bot.infinity_polling()

