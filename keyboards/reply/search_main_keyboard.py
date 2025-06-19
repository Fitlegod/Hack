from telebot.types import ReplyKeyboardMarkup, KeyboardButton

def search_main_keyboard() -> ReplyKeyboardMarkup:
    keyboard = ReplyKeyboardMarkup()
    item1 = KeyboardButton(text="/подобрать")
    keyboard.add(item1)
    return keyboard