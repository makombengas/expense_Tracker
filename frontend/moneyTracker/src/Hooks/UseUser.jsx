import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import useMessage from "./useMessages";
const baseURI = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURI;

const UserContext = createContext({
  user: null,
  loading: false,
  register: async () => false, // 500
  login: async () => false, // 500
  logout: async () => null,
});

const success = "success";
const error = "error";

const UserContextProvider = ({ children }) => {
  const message = useMessage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        setIsLoggedIn(true);
        message.setMessage({
          type: "success",
          description: `Hello ${response.data?.name}`,
        });
      })
      .catch(() =>
        message.setMessage({
          type: "success",
          description: `"Willkommen, noch nicht eingeloggt?"`,
        })
      )
      .finally(() => setLoading(false));
  }, []);

  const exportData = {
    user: user,
    loading: loading,
    //  *** REGISTER ***
    register: async (name, email, password) => {
      const response = await axios
        .post("user/register", { name, email, password })
        .catch((err) => err.response);

      const message1 = Object.values(response.data.message);
      console.log("message1 für Bernard", message1);
      console.log("name für Bernard", name);

      if (response.status === 201) {
        setUser(response.data);
        setIsLoggedIn(true);
        message.setMessage({
          type: "success",
          description: `Willkommen ${name}`,
        });
        return true;
      } else if (response.status === 400) {
        message.setMessage({
          type: error,
          description: `${message1[0]}`,
        });
        return false;
      } else {
        message.setMessage({
          type: "error",
          description: `Etwas ist schief gegangen`,
        });
        return false;
      }
    },
    //  *** LOGIN ***
    login: async (email, password) => {
      const response = await axios
        .post("/user/login", {
          email,
          password,
        })
        .catch((err) => err.response);

      if (response.status === 200) {
        setUser(response.data);
        setIsLoggedIn(true);
        message.setMessage({
          type: "success",
          description: ` ${response.data.name} ${response.data.message}`,
        });
        console.log(response.data);
        return true;
      } else if (response.status === 401) {
        setIsLoggedIn(false);
        message.setMessage({
          type: error,
          description: response.data.message,
        });
        return false;
      } else {
        message.setMessage({
          type: error,
          description: response.data.message,
        });
        return false;
      }
    },
    // *** LOGOUT ***
    logout: async () => {
      const { status, data } = await axios.get("/user/logout");
      console.log("xxx", data);
      console.log(data.message);
      if (status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        message.setMessage({
          type: success,
          description: data,
        });
      }
    },
    isLoggedIn,
  };

  return (
    <UserContext.Provider value={exportData}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

export default function useUser() {
  return useContext(UserContext);
}
