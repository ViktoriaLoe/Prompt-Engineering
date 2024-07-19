# Prompt Engineering Tool

## Overview

This project is a Prompt Engineering Tool designed to streamline the creation, editing, and execution of prompts for Large Language Models (LLMs) such as Azure OpenAI. The tool is built using Next.js, TypeScript, and Tailwind CSS for the frontend, while Python and MongoDB are used for the backend to handle data management and prompt execution. The tool allows users to dynamically edit prompts, save results, and compare data such as cost and time of execution.

## Features

- **Dynamic Prompt Editing**: Users can create and edit prompts dynamically through a user-friendly interface.
- **Prompt Execution**: Prompts are executed using Azure OpenAI or any other LLM of your choice.
- **Data Management**: MongoDB is used to store and manage prompt data, execution results, and related metadata.
- **Result Saving and Comparison**: Save the results of prompt executions, and compare them based on various metrics such as cost and time.
- **Cost and Time Analysis**: Track and analyze the cost and time taken for each prompt execution.

## Technologies Used

### Frontend

- **Next.js**: A React framework for server-side rendering and building static web applications.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **DaisyUI / Tailwind CSS**: A tailwind built CSS component library, utility-first CSS framework for rapid UI development.

### Backend

- **Python**: The primary language for backend logic and integration with LLM APIs.
- **MongoDB**: A NoSQL database used for storing prompt data, results, and related information.
- **Azure OpenAI**: The LLM service used for executing the prompts. (Can be substituted with any other preferred LLM service).


## Connect to database
Ensure your connection string is correct and update you .env.locale file
Insert your Database name into the .env file and update collection name of where to access the mockdata and prompts
