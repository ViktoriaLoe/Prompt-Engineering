from dotenv import load_dotenv, find_dotenv
import os
from langchain_openai import AzureChatOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_database


load_dotenv(find_dotenv())

# CORS
app = Flask(__name__)
CORS(app) 


@app.route('/save_data', methods=['POST'])
def save_data():
    print("saving data")
    try:
        database_name = request.json.get('database_name')
        collection_name = request.json.get('collection_name')
        data = request.json.get('data')

        if not database_name or not collection_name or not data :
            return jsonify({"error": "Missing database_name or collection_name parameter or data"}), 400
        
        collection = get_database(database_name, collection_name)
        
        collection.insert_one(data)
        return jsonify({"message": "Data saved successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# GET DATA FROM DATABASE
@app.route('/get_all_data', methods=['GET'])
def get_all_data():
    try:
        # Fetch all documents in the collection
        database_name = request.args.get('database_name')
        collection_name = request.args.get('collection_name')

        if not database_name or not collection_name:
            return jsonify({"error": "Missing database_name or collection_name parameter"}), 400

        users_collection = get_database(database_name, collection_name)
        print("trying to get", users_collection, database_name, collection_name)
        cursor = users_collection.find({})
        data = []
        for document in cursor:
            document['_id'] = str(document['_id'])  # Convert ObjectId to string for JSON serialization
            data.append(document)
        print("Data fetched successfully!", data, flush=True)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# LLM client
def get_llm_client():
    llm = AzureChatOpenAI(
        openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
        azure_deployment=os.getenv("AZURE_OPENAI_GPT4O_DEPLOYMENT_NAME"),
        temperature=0,
    )
    return llm

# Support functions
def call_OpenAI(prompt, data):
    llm = get_llm_client()
    result = llm.invoke(prompt + "context:" + data)
    tokens = result.response_metadata["token_usage"] 
    return result.content, tokens


@app.route('/submit_prompt', methods=['POST'])
def submit_prompt():
    """
    Send prompt and mockdata from frontend to AzureOpenAI
    """
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        prompt = data.get('prompt')
        input_data = data.get('data')

        if not prompt or not input_data:
            return jsonify({'error': 'Prompt and data are required'}), 400

        # Call OpenAI with the provided prompt and data
        response, tokens = call_OpenAI(prompt, input_data)
        print("got result", response, tokens)
        if not response:
            return jsonify({'error': 'Failed to get response from OpenAI'}), 500

        return jsonify({
            'response': response,
            'tokens': tokens
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=1234)
