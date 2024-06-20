import Login from "../../components/Dropdown/Login";
import Signup from "../../components/Dropdown/Signup";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login_page__main">
      <h1>Log in or sign up</h1>
      <div className="login_page__flex">
        <div>
          <Login backToHomepage={true} />
        </div>
        <div>
          <Signup />
        </div>
      </div>
    </div>
  );
}
