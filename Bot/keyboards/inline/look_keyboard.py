from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

def look_keyboard():
    keyboard = InlineKeyboardMarkup()
    item_1 = InlineKeyboardButton(text="Понравилось", callback_data='look-for-save')
    item_2 = InlineKeyboardButton(text="Не понравилось", callback_data='look-for')
    keyboard.add(item_1, item_2)
    return keyboard