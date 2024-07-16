import Input from './components/Input';
import PromptTextArea from './components/PromptList';
import PromptList from './components/PromptList';
import ResultDisplay from './components/ResultDisplay';
// import TokenInfo from './components/TokenInfo';
import { useAppContext } from './context/AppContext';
import 'daisyui/dist/full.css';

const Home = () => {
  const { application, prompt, promptName, instructions, setResult, setInstructions } = useAppContext();

  const handleSubmit = async () => {
    const response = await fetch('/api/submitPrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promptName, text: application, instructions }), // add set tokenss
    });

    const result = await response.json();
    setResult(result.response);
    // setTokens(result.tokens);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Prompt Engineering: Anonymiser og rydd opp i transkripsjoner</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <aside>
          <PromptList />
        </aside>
        <main className="col-span-2 space-y-4">
          <Input />
          <PromptTextArea />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <ResultDisplay />
          {/* <TokenInfo /> */}
        </main>
      </div>
    </div>
  );
};

export default Home;
