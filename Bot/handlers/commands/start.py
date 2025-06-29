from Bot.keyboards.inline.start_keyboard import start_keyboard
from Bot.loader import bot
from telebot.types import Message
from Bot.loader import collection

@bot.message_handler(commands=['start', 'старт'])
def start(message: Message) -> None:
    bot.delete_state(message.chat.id, message.chat.id)
    bot.send_message(message.chat.id, 'Что вы хотите?', reply_markup=start_keyboard())
    filt = {"user-id": str(message.from_user.username)}
    info = {"$set": {
        "floor": 0,
        "price": 0,
        "city": 0,
        "rooms": 0,
        'last-seen': 0,
        "liked": [],
        "seen": [],
        "saved": []}}
    collection.update_one(filt, info, upsert=True)