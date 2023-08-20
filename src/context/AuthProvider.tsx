import { createContext, useContext, useState } from "react";

interface AuthContext {
  auth?: {
    user?: User;
    access_token?: string;
    error?: string;
  };

  setAuth: any;
  persist: any;
  setPersist: React.Dispatch<any>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState();
  const [error, setError] = useState("");
  const [persist, setPersist] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
