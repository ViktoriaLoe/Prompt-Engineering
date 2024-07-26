"use client";
import Input from "./components/Input";
import PromptTextArea from "./components/PromptTextArea";
import PromptList from "./components/List/PromptList";
import ResultDisplay from "./components/ResultDisplay";
import { useAppContext } from "./context/AppContext";
import { result } from "../../types";
import DataList from "./components/List/DataList";
import SavePrompt from "./components/SavePrompt";
import { useState } from "react";
import SaveResult from "./components/SaveResult";

const Home = () => {
  const { mockdata, prompt, result, setResult } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const startTime = Date.now();
      const response = await fetch("/api/submit_prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, mockdata }),
      });

      const result = await response.json();
      const endTime = Date.now();
      const duration = endTime - startTime;
      if (result.error) {
        // Handle the error
        console.error(result.error);
      } else {
        const resultObject: result = {
          resultText: result.response,
          duration,
          tokens: {
            prompt_tokens: result.tokens.prompt_tokens,
            completion_tokens: result.tokens.completion_tokens,
            total_tokens: result.tokens.total_tokens,
          },
        };
        console.log("res", resultObject);
        setResult(resultObject);
      }
    } catch (error) {
      console.error("Failed to submit the prompt", error);
    } finally {
      setLoading(false);
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
          <SavePrompt />
          <div className="flex">
            <button
              className={`btn btn-primary mr-2 text-base-100 ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
              onClick={handleSubmit}
            >
              Submit prompt
            </button>
            {result && !loading && (
              <div>
                <SaveResult />
              </div>
            )}
          </div>
          {loading ? (
            <div className="mt-8 flex justify-center items-center">
              <div className="loading loading-spinner"></div> {/* DaisyUI loading spinner */}
            </div>
          ) : (
            result && (
              <div className="mt-4">
                <ResultDisplay />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
