import { createContext, ReactNode, useState, useContext } from "react";

interface MyContextProps {
  myArray: string[];
  setMyArray: React.Dispatch<React.SetStateAction<string[]>>;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [myArray, setMyArray] = useState<string[]>([]);

  return (
    <MyContext.Provider value={{ myArray, setMyArray }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
