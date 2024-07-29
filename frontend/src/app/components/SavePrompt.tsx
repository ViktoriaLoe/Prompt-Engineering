"use client";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { v4 as uuidv4 } from 'uuid';

const SavePrompt = () => {
  const { prompt, setPrompt, allPrompts, setAllPrompts } = useAppContext();
  const [promptName, setPromptName] = useState(prompt.promptName);

  const handleSave = async () => {
    const newPrompt = {
      ...prompt,
      promptName: promptName 
    };

    try {
      console.log(newPrompt)
      const response = await fetch("/api/save_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            data: newPrompt }),
      });


      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      } else {
        const updatedPrompts = [...allPrompts, { ...newPrompt, id: uuidv4() }];
        setAllPrompts(updatedPrompts);
        setPrompt(newPrompt);
      }
    } catch (error) {
      console.error("Failed to save the prompt", error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter prompt name"
        value={promptName}
        onChange={(e) => setPromptName(e.target.value)}
        className="input input-bordered"
      />
      <button className="btn btn-primary" onClick={handleSave}>
        Save Prompt to Database 
      </button>
    </div>
  );
};

export default SavePrompt;
