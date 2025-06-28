from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup


def start_keyboard() -> InlineKeyboardMarkup:
    keyboard = InlineKeyboardMarkup()
    item_1 = InlineKeyboardButton(text="Найти квартиру", callback_data='search')
    item_2 = InlineKeyboardButton(text="Начать подбор", callback_data='look-for')
    keyboard.add(item_1)
    keyboard.add(item_2)
    return keyboard