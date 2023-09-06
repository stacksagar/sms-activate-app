import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
  user: UserT;
  setUser: React.Dispatch<React.SetStateAction<UserT>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  fetched: boolean;
  setFetched: React.Dispatch<React.SetStateAction<boolean>>;

  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;

  api_balance: number;
  setApiBalance: React.Dispatch<React.SetStateAction<number>>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  const [user, setUser] = useState<UserT>({} as UserT);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [api_balance, setApiBalance] = useState(0);

  useEffect(() => {
    const sessionUser = session?.data?.user as UserT;
    if (!sessionUser?.email) {
      setTimeout(() => {
        setFetched(true);
      }, 500);
      return;
    }

    setLoading(true);
    setUser(sessionUser);
    async function fetch() {
      try {
        const userRes = await axios.get<{ user: UserT }>(
          `/api/auth/_fetch?id=${sessionUser?._id}`
        );

        setUser((p) => ({
          ...p,
          ...userRes?.data?.user,
        }));

        const apiBalanceRes = await axios.get(
          `/api/sms-active/action/getBalance`
        );

        const api_balance = Number(apiBalanceRes?.data?.data?.split(":")[1]);
        setApiBalance(api_balance);
      } catch (error) {
        console.log("ERROR Context AuthProvider: ", error);
      } finally {
        setLoading(false);
        setFetched(true);
      }
    }

    fetch();
  }, [session]);

  useEffect(() => {
    console.log(fetched ? "[Fast Refreshed::]" : "[Fast Refreshing::]");
  }, [fetched]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        api_balance,
        setApiBalance,
        fetched,
        setFetched,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
