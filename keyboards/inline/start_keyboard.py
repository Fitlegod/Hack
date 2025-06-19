from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup


def start_keyboard() -> InlineKeyboardMarkup:
    keyboard = InlineKeyboardMarkup()
    item_1 = InlineKeyboardButton(text="Find", callback_data='search')
    item_2 = InlineKeyboardButton(text="history", callback_data='history')
    keyboard.add(item_1, item_2)
    return keyboard