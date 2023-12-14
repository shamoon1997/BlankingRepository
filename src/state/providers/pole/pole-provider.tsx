import { createContext, ReactNode, useState, useContext } from "react";

interface PoleContextProps {
  poleIds: string[];
  setPoleIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const PoleContext = createContext<PoleContextProps | undefined>(undefined);

export const PoleContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [poleIds, setPoleIds] = useState<string[]>([]);

  return (
    <PoleContext.Provider value={{ poleIds, setPoleIds }}>
      {children}
    </PoleContext.Provider>
  );
};

export const usePoleContext = () => {
  const context = useContext(PoleContext);
  if (!context) {
    throw new Error(
      "usePoleContext must be used within a Pole context Provider",
    );
  }
  return context;
};
