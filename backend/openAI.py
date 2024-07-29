
from dotenv import load_dotenv, find_dotenv
import os
from langchain_openai import AzureChatOpenAI


load_dotenv(find_dotenv())

llm = AzureChatOpenAI(
    openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_deployment=os.getenv("AZURE_OPENAI_GPT4O_DEPLOYMENT_NAME"),
    temperature=0,
)


# BASIC INVOKE
def azure_openai():
    try:
        msg = ["system", "you're very funny", "human", "tell me a joke"]
        Ires = llm.invoke(msg)
        print(Ires)
    except Exception as e:
        print(e)
        print("Error with openAI")



# PROMPT TEMPLATE
from langchain_core.prompts import PromptTemplate

def prompt_template(): 
    template = """given {data}, Think step by step how to {question}"""
    prompt_temp = PromptTemplate(input_variables=["data","question"],
                            template=template)
    formated_prompt= prompt_temp.format(data="9 8 73 28 49", question="sort a list of numbers list")
    result = llm.invoke(formated_prompt)
    print(result.content)


prompt_template()



# WITH LLM CHAIN
from langchain.chains import LLMChain
def llm_chain():
    prompt_template = PromptTemplate(template="""given {data}, Think step by step how to {question}""",
                                    input_variables=["data","question"])
    
    chain = LLMChain(llm=llm, prompt=prompt_template, verbose=True)
    response = chain.invoke(data="", question="")
    print(response)




# OBJECT WITH MEMORY 
from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    HumanMessagePromptTemplate,
)
from langchain.schema import (SystemMessage, HumanMessage)
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import LLMChain

def create_chat_prompt():
    prompt = ChatPromptTemplate(
        input_variables = ['input'],
        messages=[
            SystemMessage(content='''INstructions'''
                          ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template('{input}'),
            #AIMessagePromptTemplate.from_template('Bot: '),
        ]
    )
    return prompt
class ChatBot(object):
    def __init__(self, history_length=4):
        self.chat_prompt = create_chat_prompt()
        self.history_lenght = history_length
        self.memory = ConversationBufferWindowMemory(
            memory_key="chat_history", 
            return_messages=True,
            k=self.history_lenght)
        self.llm = llm

        self.llmchain = LLMChain(llm=self.llm,
                        prompt=self.chat_prompt,
                        memory=self.memory,
                        verbose=True,
            )

    def get_response(self, query):
        response = self.llmchain.invoke(input = query)
        print(self.llmchain.memory)
        return response['text']

    def clear_chat_history(self):
        self.memory.clear()



