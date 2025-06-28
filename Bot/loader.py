from telebot import TeleBot
from telebot.storage import StateMemoryStorage
from Bot.config_data import config
from pymongo import MongoClient

url = "".join(["mongodb+srv://", config.USERNAME,":",config.PASSWORD,"@cluster0.golglyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"])
client = MongoClient(url)
print("Запущен")
db = client[config.DATABASE_NAME]
collection = db[config.COLLECTION_NAME]
storage = StateMemoryStorage()
bot = TeleBot(token=config.BOT_TOKEN, state_storage=storage)