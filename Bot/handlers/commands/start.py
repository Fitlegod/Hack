from Bot.keyboards.inline.start_keyboard import start_keyboard
from Bot.loader import bot
from telebot.types import Message

@bot.message_handler(commands=['start', 'старт'])
def start(message: Message) -> None:
    bot.send_message(message.chat.id, 'Позвольте показать вам, что я умею', reply_markup=start_keyboard())