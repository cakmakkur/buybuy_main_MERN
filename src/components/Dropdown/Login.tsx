import { useEffect, useState } from "react";
import { useAuthContext } from "../../global_variables/AuthContext";
import toast from "react-hot-toast";
import toastConfigs from "../../utils/toastConfig";
import { useNavigate, useLocation } from "react-router-dom";

type LoginProps = {
  setDropdownOpen: React.Dispatch<React.SetStateAction<string>>,
  backToHomepage: boolean
}

type ButtonConfig = React.ComponentProps<"button">

// interface ImportMetaEnv {
//   VITE_URL_LOGIN: string
// }
// interface ImportMeta {
// readonly env: ImportMetaEnv;
// }

interface ReqOptionsType {
  method: string,
  headers: {
    "Content-Type": string,
  },
  credentials: RequestCredentials,
  body: string,
}




export default function Login({ setDropdownOpen, backToHomepage }: LoginProps) {
  const [isFocused, setIsFocused] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuth, setPersist } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPersistedChecked, setIsPersistedChecked] = useState<boolean>(false)

  const LOGIN_URL: string = import.meta.env.VITE_URL_LOGIN;
  if (!LOGIN_URL) {
    throw new Error('Environment variable VITE_URL_LOGIN is not defined');
  }

  useEffect(() => {
    const persisted = localStorage.getItem("persist");
    if (persisted) {
      const persistSelection: boolean = JSON.parse(persisted)
      setIsPersistedChecked(persistSelection)
    }
  }, [])



  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (username === "" || password === "")
      return toast.error("All fields must be filled", toastConfigs);

    const creds = {
      username,
      password,
    };
    const reqOptions: ReqOptionsType = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(creds),
    };
    try {
      if (username && password) {
        const response = await fetch(LOGIN_URL, reqOptions);
        const data = await response.json();
        if (response.status === 403)
          return toast.error("No such user found!", toastConfigs);
        if (response.status === 401)
          return toast.error("Wrong password!", toastConfigs);
        if (!response.ok) return toast.error("An error occured", toastConfigs);
        toast.success("Logged in successfully", toastConfigs);
        setAuth(data);
        if (backToHomepage) {
          navigate("/", { state: { from: location }, replace: true });
        } else {
          setDropdownOpen("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFocus = (param: string) => {
    setIsFocused(param);
  };

  const handleBlur = () => {
    setIsFocused("");
  };

  function handleUsernameInput(username: string) {
    setUsername(username);
  }
  function handlePasswordInput(password: string) {
    setPassword(password);
  }
  function handlePersist(e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem("persist", JSON.stringify(e.target.checked));
    setPersist(e.target.checked);
    setIsPersistedChecked(!isPersistedChecked)
  }

  return (
    <form className="user_form" action="">
      <h3>Login to your account</h3>
      <div className="username_div">
        <label
          className={
            isFocused === "username" || username !== "" ? "label_disappear" : ""
          }
          htmlFor="username"
        >
          Username
        </label>
        <input
          onFocus={() => handleFocus("username")}
          onBlur={handleBlur}
          name="username"
          type="text"
          onChange={(e) => handleUsernameInput(e.target.value)}
          value={username}
        />
      </div>
      <div className="password_div">
        <label
          className={
            isFocused === "password" || password !== "" ? "label_disappear" : ""
          }
          htmlFor="password"
        >
          Password
        </label>
        <input
          onFocus={() => handleFocus("password")}
          onBlur={handleBlur}
          onChange={(e) => handlePasswordInput(e.target.value)}
          name="password"
          type="password"
          value={password}
        />
      </div>
      <div className="stayLoggedIn">
        <input
          onChange={(e) => handlePersist(e)}
          className="checkInp"
          type="checkbox"
          name="stayLoggedIn"
          checked={isPersistedChecked}
        />
        <label style={{ position: "relative" }} htmlFor="stayLoggedIn">
          Stay Logged In
        </label>
      </div>
      <button onClick={handleSubmit} className="submit_button" type="submit">
        Login
      </button>
    </form>
  );
}
