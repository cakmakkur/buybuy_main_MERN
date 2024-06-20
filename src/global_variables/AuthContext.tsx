import { createContext, useState, useContext, useEffect } from "react";

interface AuthState {
  username: string;
  roles: number[];
  accessToken: string;
  address: string;
  name: string;
  familyName: string;
}

type AuthContextType = {
  auth: AuthState | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthState | undefined>>;
  address: string;
  name: string;
  familyName: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setFamilyName: React.Dispatch<React.SetStateAction<string>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<AuthState | undefined>(undefined);
  const [persist, setPersist] = useState<boolean>(() => {
    const persistedValue = localStorage.getItem("persist");
    return persistedValue !== null ? JSON.parse(persistedValue) : false;
  });
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");

  useEffect(() => {
    if (auth) {
      setAddress(auth.address);
      setName(auth.name);
      setFamilyName(auth.familyName);
    }
  }, [auth]);

  const value: AuthContextType = {
    auth: auth,
    setAuth,
    address,
    name,
    familyName,
    setFamilyName,
    setAddress,
    setName,
    persist,
    setPersist,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
