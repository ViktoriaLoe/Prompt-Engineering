from dotenv import load_dotenv, find_dotenv
import os
from langchain_openai import AzureChatOpenAI
# from data.mockdata import mockdata  # change to get from database
# from data.prompts import prompts
from promptUtils import replace_back_special_chars

load_dotenv(find_dotenv())

llm = AzureChatOpenAI(
    openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_deployment=os.getenv("AZURE_OPENAI_GPT4O_DEPLOYMENT_NAME"),
    temperature=0,
)

def call_OpenAI(prompt_name, data, instructions=""):
    # print("running with prompt", prompt_name)
    if instructions:
        print("running with custom instructions, not saved", prompt_name)
        prompt = prompts[prompt_name].format(data=data, instructions=instructions)
    else:
        prompt = prompts[prompt_name].format(data=data, instructions=instructions or "")
    prompt = replace_back_special_chars(prompt)
    result = llm.invoke(prompt)
    tokens = result.response_metadata["token_usage"] 
    return result.content, tokens