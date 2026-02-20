import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/config";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  profileUrl: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  city: string;
  bio: string;
  collegeName: string;
  studyIn:string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("studyItToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data.status === true) {
        setUser(response.data?.data[0]);
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, isLoading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
