import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface IUserData {
  email: string;
  password: string;
  incorrect: boolean;
  logged: boolean;
}

interface IUserContextType {
  userData: IUserData;
  setUserData: Dispatch<SetStateAction<IUserData>>;
}

const UserContext = createContext<IUserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<IUserData>(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData
      ? JSON.parse(savedUserData)
      : {
          email: "",
          password: "",
          incorrect: false,
          logged: false,
        };
  });

  useEffect((): void => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};

export const useUserContext = (): IUserContextType => {
  const context: IUserContextType | undefined = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
