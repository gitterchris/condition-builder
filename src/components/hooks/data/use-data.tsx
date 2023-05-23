import { createContext, ReactNode, useContext } from "react";
import { LeftConditionType } from "@/utils/queries";

interface Props {
  children: ReactNode;
}

interface DataContextType {
  leftConditions: LeftConditionType[];
}

const DataContext = createContext<DataContextType>({
  leftConditions: [],
});

export const DataContextProvider = ({ children }: Props) => {
  // TODO: Hardcoding this for now.
  // Value should come from the API call and should be filtered.
  const leftConditions = [
    {
      text: "name",
      value: "name",
    },
    {
      text: "id",
      value: "id",
    },
  ];
  return (
    <DataContext.Provider value={{ leftConditions }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);
export default useData;
