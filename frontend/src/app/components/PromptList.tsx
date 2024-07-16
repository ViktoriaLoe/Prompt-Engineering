import { useAppContext } from '../context/AppContext';
import 'daisyui/dist/full.css';

const PromptList = () => {
  const { setPrompt, setPromptName, prompts } = useAppContext();

  return (
    <div>
      <h2 className="text-lg font-bold">Prompts</h2>
      {Object.keys(prompts).map((name) => (
        <div key={name} className="flex justify-between items-center">
          <button
            className="btn btn-link"
            onClick={() => {
              setPrompt(prompts[name]);
              setPromptName(name);
            }}
          >
            {name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PromptList;
