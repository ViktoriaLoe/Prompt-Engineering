import { useAppContext } from '../context/AppContext';
import 'daisyui/dist/full.css';

const Input = () => {
  const { application, setApplication } = useAppContext();

  return (
    <textarea
      className="textarea textarea-bordered w-full h-60"
      placeholder="Skriv inn transkripsjon her"
      value={application}
      onChange={(e) => setApplication(e.target.value)}
    />
  );
};

export default Input;
