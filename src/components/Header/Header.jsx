import { useContext, useEffect, useRef, useState } from "react";
import Style from "./Header.module.css";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../App"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate()
  const { isLoading, setIsLoading, token, setToken } = useContext(UserContext)
  const [isModal, setIsModal] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogout = () => {
    toast('Please Wait...')
    setTimeout(() => {
      navigate('/login')
      setToken(null)
      localStorage.removeItem('authToken')
    }, 2000);
  }

  const getUsername = () => {
    const getToken = localStorage.getItem('authToken')
    const decode = jwtDecode(getToken)
    setUsername(decode.username);
  }

  useEffect(() => {
    getUsername()
  }, [token])

  return (
    <div className={Style.header}>
      <h3 className={Style.projectTitle}>Url Shortner</h3>
      <div className={Style.navigation}>
        <ul>
          <li className={Style.navigationList}>User </li>
          <li className={Style.navigationList}> : {username}</li>
        </ul>
        <div className={Style.profileBurger}>
          <FaUserCircle size={38} onClick={() => setIsModal(prev => !prev)} />
          {isModal &&
            <div className={Style.modalContainer} >
              <p>{username}</p>
              <button className={Style.logoutButton}
                disabled={isLoading}
                onClick={handleLogout}
              >Logout</button>
            </div>}
        </div>
      </div>
    </div>
  );
}
