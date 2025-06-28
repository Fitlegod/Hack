from Bot.loader import bot
from telebot.types import Message

@bot.message_handler(commands=["help", 'помощь'], state="*")
def helper(message: Message) -> None:
    bot.delete_state(message.chat.id, message.chat.id)
    text = ("/start, /старт - Вызов начального сообщения \n"
           "/help /помощь - Вызов сообщения со списком комманд \n"
           "/find /подобрать - Начать подбор квартиры")
    bot.send_message(message.chat.id, text)
    return