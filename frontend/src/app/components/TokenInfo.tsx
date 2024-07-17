import { useContext } from "react";
import { useAppContext } from '../context/AppContext';

const TokenInfo = () => {
  const { tokens } = useAppContext();
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
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-md font-bold">Tokens used:</h3>
        <p>{tokens?.total_tokens}</p>
        <h3 className="text-md font-bold">Total cost in NOK:</h3>
        <p>{calculateTokens(tokens)}</p>
      </div>
      <div>
        <h3 className="text-md font-bold">Input tokens:</h3>
        <p>{tokens?.prompt_tokens}</p>
      </div>
      <div>
        <h3 className="text-md font-bold">Output tokens:</h3>
        <p>{tokens?.completion_tokens}</p>
      </div>
    </div>
  );
};

export default TokenInfo;
