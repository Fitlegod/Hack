from loader import bot
from telebot.types import Message
from states import States


@bot.message_handler(commands=['подобрать', 'find'])
def search_main_command(message: Message) -> None:
    bot.delete_state(message.chat.id, message.chat.id)
    bot.send_message(message.chat.id, "Прошу Вас ввести по порядку следующие данные:")
    bot.send_message(message.chat.id, "В каком городе ищите квартиру?")
    bot.set_state(message.chat.id, States.search_money, message.chat.id)
    return