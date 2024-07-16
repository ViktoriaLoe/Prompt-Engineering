# from data.prompts import prompts, prompt_names
import re
import json
import os

input_price_per_1k = 0.0529
output_price_per_1k = 0.1585

def calculate_tokens(tokens):
    input_tokens = tokens["prompt_tokens"]
    output_tokens = tokens["completion_tokens"]
    input_price = (input_tokens / 1000) * input_price_per_1k
    output_price = (output_tokens / 1000) * output_price_per_1k
    return input_price+output_price

def save_results_to_file(prompt_name, instructions, application, result, tokens):
    result_data = {
        "Prompt Name": prompt_name,
        "Instructions": instructions,
        "Application/Mock Data": application,
        "Result": result,
        "input tokens": tokens["prompt_tokens"],
        "output tokens": tokens["completion_tokens"],
        "total cost NOK": calculate_tokens(tokens)
    }
    file_path = "./results/results.json"

    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
    else:
        data = []
    data.append(result_data)
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)


# def save_prompt_to_file(name, instructions):
#     if name not in prompt_names:
#         prompt_names.append(name)
#     instructions = replace_special_chars(instructions)
#     prompts[name] = instructions

#     with open('./data/prompts.py', 'w') as f:
#         f.write('prompts = {\n')
#         for key, value in prompts.items():
#             f.write(f'    "{key}": """{value}""",\n\n')  # Add newline between pairs
#         f.write('}\n\n')
#         f.write('prompt_names = [\n')
#         for name in prompt_names:
#             f.write(f'    "{name}",\n')
#         f.write(']\n')


# def delete_prompt_from_file(name):
#     if name in prompts:
#         del prompts[name]
#         prompt_names.remove(name)

#         with open('./data/prompts.py', 'w') as f:
#             f.write('prompts = {\n')
#             for key, value in prompts.items():
#                 f.write(f'    "{key}": """{value}""",\n\n')
#             f.write('}\n\n')
#             f.write('prompt_names = [\n')
#             for pname in prompt_names:
#                 f.write(f'    "{pname}",\n')
#             f.write(']\n')

