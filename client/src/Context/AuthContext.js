import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export function useAuthContext() {
  return useContext(AuthContext);
}
export const checkAuth = (setAuth) => {
  console.log("checkauth1");
  axios
    .get("/api/user")
    .then((res) => {
      console.log("checkAuth");
      setAuth({ user: res.data, loading: false });
    })
    .catch((err) => {
      setAuth({ user: null, loading: false });
    });
};

export default function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    isAuth: false,
  });
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    async function ch() {
      if (!loading) setLoading(true);
      await axios
        .get("/api/user")
        .then((res) => {
          setAuth((prevAuth) => ({
            isAuth: true,
            user: res.data,
          }));
        })
        .catch((err) => {
          console.log(err);
          setAuth((prevAuth) => ({
            isAuth: false,
            user: null,
          }));
        });
      setLoading(false);
    }
    // setLoading(true);
    ch();
    // setLoading(false);
  };
  //get user
  useEffect(() => {
    // setLoading(true);
    checkAuth();
    // setLoading(false);
  }, []);

  //logout
  const logout = () => {
    if (auth.user !== null) {
      setLoading(true);
      axios
        .get("/api/user/logout")
        .then((response) => {
          console.log("logout");
          setAuth({ user: null, isAuth: false });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      return false;
    }
  };
  // login
  const login = async (authForm) => {
    setLoading(true);
    await axios
      .post("/api/auth", authForm)
      .then((res) => {
        if (res.data.code === 2000) {
          console.log("login");
          checkAuth();
          // setLoading(false);
        } else {
          setAuth({ ...auth, isAuth: false });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const editProfile = async (profile) => {
    await axios
      .post("/api/user/profile", profile)
      .then((res) => {
        console.log(res);
        checkAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, loading, editProfile }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
