"use client";
import { useAppContext } from "../context/AppContext";
import { mockdata } from "../../../types";

const DataList = () => {
  const { allMockdata, setMockdata, mockdata } = useAppContext();

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Mock Data</h2>
      <div className="accordion">
        {allMockdata &&
          allMockdata.map((dataItem: mockdata) => (
            <div
              key={dataItem._id}
              className="collapse collapse-arrow border border-base-300 rounded-box"
            >
              <input
                type="radio"
                name="accordion"
                id={`accordion-${dataItem._id}`}
                className="peer"
              />
              <div className="collapse-title flex justify-between items-center p-2 font-bold">
                <span>{dataItem.name}</span>
              </div>
              <div className="collapse-content text-sm flex justify-between items-center">
                <p>{dataItem.data}</p>
                <button
                  className={`btn-circle border btn-xs ${
                    mockdata && mockdata._id === dataItem._id
                      ? "bg-light-green text-light-green border-light-green"
                      : "bg-gray-300 text-transparent"
                  }`}
                  onClick={() => setMockdata(dataItem)}
                >
                  {mockdata && mockdata._id === dataItem._id ? "X" : ""}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DataList;
