import os
from flask import Flask, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
# MongoDB connection URI
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

# Connect to the database and collection
db = client["prompt_engineering_test"]
users_collection = db.mockdata


def close_connection():
    client.close()

def get_database(database_name, collection_name):
    print(collection_name)
    db = client[database_name]
    users_collection = db[collection_name]
    return users_collection
    
# Fetch and print the names of all users
def get_user_names():
    try:
        users = users_collection.find({}, {"name": 1, "_id": 0})
        user_names = [user["name"] for user in users]
        print("User Names:", user_names)
        return user_names
    except Exception as e:
        print("An error occurred while fetching user names:", e)
        return []

# Add a new user
def add_new_mockdata(user_id, name, data):
    try:
        new_user = {
            "_id": user_id,
            "name": name,
            "data": data,
        }
        users_collection.insert_one(new_user)
        print("New user added successfully!")
    except Exception as e:
        print("An error occurred while adding a new user:", e)

# Fetch and print user names
# get_user_names()

# Add a new user
# add_new_mockdata("59b99db4cfa9a34dcd7885b7", "Data1", "I want to go to school")
