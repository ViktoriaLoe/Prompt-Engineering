# import os
# from flask import Flask, jsonify
# from pymongo import MongoClient
# from pymongo.server_api import ServerApi
# from dotenv import load_dotenv, find_dotenv

# load_dotenv(find_dotenv())
# # MongoDB connection URI
# MONGO_URI = os.getenv("MONGO_URI")
# client = MongoClient(MONGO_URI)

# # Connect to the database and collection
# db = client["prompt_engineering_test"]
# users_collection = db.mockdata


# def close_connection():
#     client.close()

# def get_database(database_name, collection_name):
#     print(collection_name)
#     db = client[database_name]
#     users_collection = db[collection_name]
#     return users_collection
    
# def save_data(user_id, name, data):
#     try:
#         new_user = {
#             "_id": user_id,
#             "name": name,
#             "data": data,
#         }
#         users_collection.insert_one(new_user)
#         print("New user added successfully!")
#     except Exception as e:
#         print("An error occurred while adding a new user:", e)

