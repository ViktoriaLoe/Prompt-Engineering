import { useAppContext } from "../context/AppContext";
import "daisyui/dist/full.css";

const PromptTextArea = () => {
  const { prompt, setPrompt } = useAppContext();

  return (
    <div className="flex space-x-4">
      <textarea
        className="textarea textarea-bordered w-full h-80"
        placeholder="Skriv inn transkripsjon her"
        value={prompt.promptText}
        onChange={(e) => setPrompt({ ...prompt, promptText: e.target.value })}
      />
      {/* <input
        type="text"
        className="input input-bordered"
        placeholder="New Prompt Name"
        value={prompt.promptName}
        onChange={(e) => setPrompt({ ...prompt, promptName: e.target.value })}
      /> */}
    </div>
  );
};

export default PromptTextArea;
