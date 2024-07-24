import { useAppContext } from "../context/AppContext";

const PromptTextArea = () => {
  const { prompt, setPrompt } = useAppContext();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Write Prompt</h1>
      <div className="flex space-x-4">
        <textarea
          className="placeholder-base-200 textarea textarea-bordered w-full h-80 bg-primary text-base-100"
          placeholder="Skriv inn transkripsjon her"
          value={prompt.promptText}
          onChange={(e) => setPrompt({ ...prompt, promptText: e.target.value })}
        />
      </div>
    </div>
  );
};

export default PromptTextArea;
