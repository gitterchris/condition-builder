import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { LeftConditionType, DataTypes } from "@/utils/types";
import { getMockData } from "./mock";

interface Props {
  children: ReactNode;
}

interface DataContextType {
  leftConditions: LeftConditionType[];
  setUrl(url: string): void;
  data: DataTypes;
}

const DataContext = createContext<DataContextType>({
  leftConditions: [],
  setUrl: () => {},
  data: [],
});

const getLeftConditions = (data: DataTypes) => {
  if (data?.length === 0) return [];
  return Object.keys(data[0]).map((key) => ({
    text: key,
    value: key,
  }));
};

export const DataContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<DataTypes>([]);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMockData();
        // const res = await fetch(url);
        // const result = await res.json();
        setData(data);
      } catch (e) {
        console.log(e);
        throw e; // TODO
      }
    };

    fetchData();
  }, [url]);

  const leftConditions = useMemo(() => getLeftConditions(data), [data]);
  return (
    <DataContext.Provider value={{ leftConditions, setUrl, data }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);
export default useData;
