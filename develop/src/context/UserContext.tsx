import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface UserData {
  email: string;
  password: string;
  incorrect: boolean;
  logged: boolean;
}

interface UserContextType {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
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

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
