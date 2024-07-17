import { useAppContext } from '../context/AppContext';
import 'daisyui/dist/full.css';

const PromptList = () => {
  const { setPrompt, allPrompts } = useAppContext();

  return (
    <div>
      <h2 className="text-lg font-bold">Prompts</h2>
      {allPrompts.map((promptItem) => (
        <div key={promptItem.promptName} className="flex justify-between items-center">
          <button
            className="btn btn-link"
            onClick={() => setPrompt(promptItem)}
          >
            {promptItem.promptName}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PromptList;
