"use client";
import { useAppContext } from "../../context/AppContext";
import GenericList from "./GenericList";
import { mockdata } from "../../../../types";

const MockDataList = () => {
  const { allMockdata, setMockdata, mockdata } = useAppContext();

  return (
    <GenericList
      title="Mock Data"
      items={allMockdata}
      itemKey={(item: mockdata) => item._id}
      itemName={(item: mockdata) => item.name}
      itemContent={(item: mockdata) => item.data}
      onItemSelect={setMockdata}
      selectedItem={mockdata}
    />
  );
};

export default MockDataList;