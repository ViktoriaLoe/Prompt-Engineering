import { useAppContext } from '../context/AppContext';
import 'daisyui/dist/full.css';

const DataList = () => {
  const { setMockdata, allMockdata } = useAppContext();

  return (
    <div>
      <h2 className="text-lg font-bold">Mock Data</h2>
      {allMockdata.map((dataItem) => (
        <div key={dataItem.mockdataName} className="flex justify-between items-center">
          <button
            className="btn btn-link"
            onClick={() => setMockdata(dataItem)}
          >
            {dataItem.mockdataName}
          </button>

        </div>
      ))}
    </div>
  );
};

export default DataList;
