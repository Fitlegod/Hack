from loader import bot
from states import States
from telebot.types import Message
from .search_result import result

@bot.message_handler(state=States.search_check)
def search_check(message: Message) -> None:
    result["floor"] = message.text
    mes = (f"Город: {result["city"]} \n Цена: до {result["money"]} \n"
           f" Количество комнат: {result["rooms"]} \n Этаж: {result["floor"]}")
    bot.send_message(message.chat.id, mes)
    bot.delete_state(message.chat.id, message.chat.id)