import { useAppContext } from '../context/AppContext';
import 'daisyui/dist/full.css';

// Inital display based on previous program
const ResultDisplay = () => {
  const { result } = useAppContext();

  return (
    <div>
      <h2 className="text-lg font-bold">Svaret er:</h2>
      <p>{result}</p>
    </div>
  );
};

export default ResultDisplay;
