"use client";
import Input from "./components/Input";
import PromptTextArea from "./components/PromptTextArea";
import PromptList from "./components/List/PromptList";
import ResultDisplay from "./components/ResultDisplay";
import TokenInfo from "./components/TokenInfo";
import { useAppContext } from "./context/AppContext";
import { tokens } from "../../types";
import DataList from "./components/List/DataList";

const Home = () => {
  const { application, prompt, result, setResult, setTokens } = useAppContext();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submitPrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, data: application }),
      });

      const result = await response.json();
      if (response.ok) {
        setResult(result.response);
        setTokens(result.tokens as tokens); // Type assertion to ensure correct type
      } else {
        console.error(result.error || "Failed to process the prompt");
      }
    } catch (error) {
      console.error("Failed to process the prompt", error);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4">
          <PromptList />
          <DataList />
        </div>
        <div className="flex-1 lg:w-5/6 space-y-4 ml-2">
          <h3 className="text-6xl font-bold underline">Prompt Engineering Tool</h3>
          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <div className="flex-1">
              <PromptTextArea />
            </div>
            <div className="flex-1">
              <Input />
            </div>
          </div>
          <button className="btn btn-primary text-base-100" onClick={handleSubmit}>
            Submit prompt
          </button>
          {result && (
            <div className="mt-4">
              <ResultDisplay />
              <TokenInfo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
