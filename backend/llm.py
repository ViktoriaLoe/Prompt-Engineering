from dotenv import load_dotenv, find_dotenv
import os
from langchain_openai import AzureChatOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
# from database import get_database


load_dotenv(find_dotenv())

# CORS
app = Flask(__name__)
CORS(app) 


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
    print(result)
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
