import { useAppContext } from "../context/AppContext";
import "daisyui/dist/full.css";

const Input = () => {
  const { mockdata, setMockdata } = useAppContext();
  
  return (
    <div >
      <h1 className="text-2xl font-bold mb-4">Input data</h1>
      <textarea
        className="placeholder-base-200 bg-primary textarea textarea-bordered w-full h-80 text-base-100"
        placeholder="Velg data til å kjøre prompten på"
        value={mockdata.data}
        onChange={(e) => setMockdata({ ...mockdata, data: e.target.value })}
      />
    </div>
  );
};

export default Input;
