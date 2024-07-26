import { useAppContext } from "../context/AppContext"; // Adjust the import path according to your file structure

const ResultDisplay = () => {
  const { result } = useAppContext();

  if (!result) {
    return null;
  }

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <h2 className="card-title text-lg font-bold">Svaret er:</h2>
      <p className="mb-2">{result.resultText}</p>
      <h3 className="text-md font-bold">Tokens:</h3>
      <div className="flex space-x-4">
        <p className="flex-1 underline">Prompt Tokens: {result.tokens.prompt_tokens}</p>
        <p className="flex-1 underline">Completion Tokens: {result.tokens.completion_tokens}</p>
        <p className="flex-1 underline">Total Tokens: {result.tokens.total_tokens}</p>
      </div>
      <h3 className="text-md font-bold">Duration:</h3>
      <p className="mb-2">{(result.duration / 1000).toFixed(3)} s</p>
    </div>
  );
};

export default ResultDisplay;
