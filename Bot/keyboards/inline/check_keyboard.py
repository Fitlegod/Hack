from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup

def check_keyboard():
    keyboard = InlineKeyboardMarkup()
    item_1 = InlineKeyboardButton(text="Верно", callback_data="look-for")
    item_2 = InlineKeyboardButton(text="Неверно", callback_data="search")
    keyboard.add(item_1)
    keyboard.add(item_2)
    return keyboard