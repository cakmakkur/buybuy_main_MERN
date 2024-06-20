import { useState } from "react";
import toast from "react-hot-toast";
import toastConfigs from "../../utils/toastConfig";

export default function Signup({ setLogOrSign }) {
  const [isFocused, setIsFocused] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const passwordRegex = new RegExp(import.meta.env.VITE_REGEX_USERPASSWORD);
  const URL_REGISTER = import.meta.env.VITE_URL_REGISTER;

  const handleSignUpFetch = async (e) => {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      repeatPassword === ""
    )
      return toast.error("All field must be filled", toastConfigs);

    if (password !== repeatPassword)
      return toast.error("Passwords don't match", toastConfigs);

    if (isValid) {
      const creds = {
        username,
        password,
      };
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      };
      try {
        const response = await fetch(URL_REGISTER, reqOptions);
        const data = await response.json();
        console.log("success: " + data);
        if (response.status === 409) {
          return toast.error("This username is taken");
        }
        if (!response.ok) {
          return toast.error("An error occured");
        }
        setIsFocused("");
        setUsername("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setIsValid(false);
        toast.success("Signed up successfully", toastConfigs);
        setLogOrSign("login");
      } catch (err) {
        toast.error("An error occured", toastConfigs);
      }
    } else {
      toast.error(
        "Password must include at least one upper and one lower case",
        toastConfigs
      );
    }
  };

  const handleFocus = (param) => {
    setIsFocused(param);
  };

  const handleBlur = () => {
    setIsFocused("");
  };

  function handleUsernameInput(username) {
    setUsername(username);
  }
  function handleEmailInput(email) {
    setEmail(email);
  }
  function handlePasswordInput(password) {
    setIsValid(passwordRegex.test(password));
    setPassword(password);
  }
  function handleRepeatPasswordInput(repeatPassword) {
    setRepeatPassword(repeatPassword);
  }

  return (
    <form className="user_form" onSubmit={handleSignUpFetch}>
      <h3 className="user_form__titel">Create a new account</h3>
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
      <div className="username_div">
        <label
          className={
            isFocused === "email" || username !== "" ? "label_disappear" : ""
          }
          htmlFor="email"
        >
          Email
        </label>
        <input
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          name="email"
          type="email"
          onChange={(e) => handleEmailInput(e.target.value)}
          value={email}
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
      <div className="password_div">
        <label
          className={
            isFocused === "repeatPassword" || repeatPassword !== ""
              ? "label_disappear"
              : ""
          }
          htmlFor="repeatPassword"
        >
          Confirm Password
        </label>
        <input
          onFocus={() => handleFocus("repeatPassword")}
          onBlur={handleBlur}
          onChange={(e) => handleRepeatPasswordInput(e.target.value)}
          name="repeatPassword"
          type="password"
          value={repeatPassword}
        />
      </div>
      <button className="submit_button" type="submit">
        Signup
      </button>
    </form>
  );
}
