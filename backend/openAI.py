
from dotenv import load_dotenv, find_dotenv
import os
from langchain_openai import AzureChatOpenAI


load_dotenv(find_dotenv())

llm = AzureChatOpenAI(
    openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_deployment=os.getenv("AZURE_OPENAI_GPT4O_DEPLOYMENT_NAME"),
    temperature=0,
)

try:
    # res = llm.invoke("write a haiku about cheese")
    msg = ["system", "you're very funny", "human", "tell me a joke"]
    Ires = llm.invoke(msg)
    print(Ires)
except Exception as e:
    print(e)
    print("Error with openAI")