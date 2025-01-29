import { useState } from "react";
import { Link } from "react-router-dom";
import { RiUserAddFill } from "react-icons/ri";
import "./index.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const [showSubmitError, setShowSubmitError] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onLoginFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
    console.log("error", errorMsg);
  };

  const onLoginSucess = () => {
    setShowSubmitSuccess(true);
    setSuccessMsg("Sign Up Successful");
    console.log("Sign Up Successful");
  };

  const onSubmitSignUpForm = async (event) => {
    event.preventDefault();
    const userDetails = { name, username, password, gender, location };

    const url = "https://logincredentials-backend.onrender.com/register";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok === true) {
        onLoginSucess();
      } else {
        onLoginFailure(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={onSubmitSignUpForm}>
        <RiUserAddFill className="signup-logo" />
        {/* <img src={signupLogo} alt="signup Logo" className="signup-logo" /> */}
        <header className="header">Signup</header>
        <div className="input-container">
          <label className="input-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="input-field"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            UserName
          </label>
          <input
            id="username"
            className="input-field"
            type="text"
            placeholder="Enter UserName"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            className="input-field"
            name="gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="input-field"
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="login-button">
          Signup
        </button>
        {showSubmitError && <p className="error-message">{errorMsg}</p>}
        {showSubmitSuccess && <p className="success-message">{successMsg}</p>}
        <p className="signUp-tag">
          Already have an account?
          <Link className="undertag" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
