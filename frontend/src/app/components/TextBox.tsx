import { useAppContext } from '../context/AppContext';
import 'daisyui/dist/full.css';

const PromptTextArea = () => {
  const { prompt, setPrompt, promptName, setPromptName } = useAppContext();

  return (
    <div className="flex space-x-4">
      <textarea
        className="textarea textarea-bordered w-full h-60"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <input
        type="text"
        className="input input-bordered"
        placeholder="New Prompt Name"
        value={promptName}
        onChange={(e) => setPromptName(e.target.value)}
      />
    </div>
  );
};

export default PromptTextArea;
