import { useContext, useState } from "react";
import Style from "../Login/Login.module.css";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  const { API, isLoading, setIsLoading } = useContext(UserContext)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    checkbox: false,
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    generic: "",
  });
  const [successMsg, setSucessMsg] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }))
  };

  // form validation
  const validateForm = () => {
    let isValid = true;
    const newError = { ...error };

    if (userData.username.trim() === "") {
      newError.username = "Username is required";
      isValid = false;
    }
    if (userData.email.trim() === "") {
      newError.email = "Email is required";
      isValid = false;
    }

    if (userData.password.trim() === "") {
      newError.password = "Password is required";
      isValid = false;
    } else if (userData.password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!userData.checkbox) {
      newError.checkbox = "Checkbox is required"
      isValid = false
    }

    setError(newError);
    return isValid;
  };

  const fetchRegister = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return;
    }
    setIsLoading(true)
    try {
      const response = await axios.post(`${API}/api/user/register`, {
        ...userData,
      });
      if (response) {
        setSucessMsg("User Registered, Redirecting to login...")
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login')
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      const error_msg = error.response.data.error;
      setError((prev) => ({ ...prev, generic: error_msg }));
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className={Style.register}>
      <form onSubmit={fetchRegister}>

        <div className={Style.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          {error.username && <p className={Style.errorTag}>{error.username}</p>}
        </div>

        <div className={Style.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          {error.email && <p className={Style.errorTag}>{error.email}</p>}
          {error.generic && <p className={Style.errorTag}>{error.generic}</p>}
        </div>

        <div className={Style.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          {error.password && <p className={Style.errorTag}>{error.password}</p>}
          {successMsg && <p style={{ color: "green" }} className={Style.errorTag}>{successMsg}</p>}
        </div>

        <div className={Style.checkboxGroup}>
          <input
            type="checkbox"
            name="checkbox"
            value={userData.checkbox}
            onChange={handleChange}
            id={`${error.checkbox && Style.errorCheckbox}`}
          />
          <label htmlFor="checkbox">I agree to the terms and conditions</label>
        </div>

        <button
          type="submit"
          className={Style.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
