import os
from dotenv import load_dotenv, find_dotenv

if not find_dotenv():
    exit("Где дотенв сука?")
else:
    load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
USERNAME = os.getenv("USERNAME_")
PASSWORD = os.getenv("PASSWORD")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")