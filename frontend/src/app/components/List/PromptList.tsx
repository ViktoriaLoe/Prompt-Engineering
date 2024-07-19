"use client";
import { useAppContext } from "../../context/AppContext";
import GenericList from "./GenericList";
import { prompt } from "../../../../types";

const PromptList = () => {
  const { allPrompts, setPrompt, prompt } = useAppContext();

  return (
    <GenericList
      title="Prompts"
      items={allPrompts}
      itemKey={(item: prompt) => item.promptName}
      itemName={(item: prompt) => item.promptName}
      itemContent={(item: prompt) => item.promptText}
      onItemSelect={setPrompt}
      selectedItem={prompt}
    />
  );
};

export default PromptList;