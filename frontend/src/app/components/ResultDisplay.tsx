import { useAppContext } from "../context/AppContext"; // Adjust the import path according to your file structure

const ResultDisplay = () => {
  const { result } = useAppContext();

  if (!result) {
    return null;
  }
  const input_price_per_1k = 0.0529;
  const output_price_per_1k = 0.1585;

  const calculateTokens = (tokens: any) => {
    const input_tokens = tokens?.prompt_tokens;
    const output_tokens = tokens?.completion_tokens;
    const input_price = (input_tokens / 1000) * input_price_per_1k;
    const output_price = (output_tokens / 1000) * output_price_per_1k;
    return input_price + output_price;
  };

 return (
  <div className="card bg-base-100 shadow-xl p-4">
    <h2 className="card-title text-lg font-bold">Result:</h2>
    <p className="mb-2">{result.resultText}</p>
    <div className="flex space-x-4">
      <div className="flex-1">
        <h3 className="text-md font-bold">Tokens:</h3>
        <p className="underline">Prompt Tokens: {result.tokens.prompt_tokens}</p>
        <p className="underline">Completion Tokens: {result.tokens.completion_tokens}</p>
        <p className="underline">Total Tokens: {result.tokens.total_tokens}</p>
      </div>
      <div className="flex-1">
        <h3 className="text-md font-bold">Duration:</h3>
        <p className="underline">{(result.duration / 1000).toFixed(3)} s</p>
        <h3 className="text-md font-bold">Total cost:</h3>
        <p className="underline">{calculateTokens(result.tokens).toFixed(4)}kr</p>
      </div>
    </div>
  </div>
);

};

export default ResultDisplay;
