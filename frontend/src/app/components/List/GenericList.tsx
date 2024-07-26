"use client";

//  Generic List component that can either display Mockdata or Prompts

interface GenericListProps<T> {
  title: string;
  items: T[];
  itemKey: (item: T) => string;
  itemName: (item: T) => string;
  itemContent: (item: T) => string;
  onItemSelect: (item: T) => void;
  selectedItem: T | null;
}
const GenericList = <T,>({
  title,
  items,
  itemKey,
  itemName,
  itemContent,
  onItemSelect,
  selectedItem,
}: GenericListProps<T>) => {
  return (
    <div>
      <h2 className="text-lg font-bold m-4 mt-2">{title}</h2>
      <div className="text-base-100 ">
        <div className="accordion">
          {items &&
            items?.map((item) => (
              <div
                key={itemKey(item)}
                className="bg-primary collapse collapse-arrow border border-base-300 rounded-box"
              >
                <input
                  type="radio"
                  name="accordion"
                  id={`accordion-${itemKey(item)}`}
                  className="peer"
                />
                <div className="collapse-title flex justify-between items-center p-2 font-bold">
                  <span>{itemName(item)}</span>
                </div>
                <div className="collapse-content text-sm flex justify-between items-center">
                  <p>{itemContent(item)}</p>
                  <button
                    className={`btn-circle border btn-xs ${
                      selectedItem && itemKey(selectedItem) === itemKey(item)
                        ? "bg-light-green text-light-green border-light-green"
                        : "bg-gray-300 text-transparent"
                    }`}
                    onClick={() => onItemSelect(item)}
                  >
                    {selectedItem && itemKey(selectedItem) === itemKey(item) ? "X" : ""}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GenericList;
