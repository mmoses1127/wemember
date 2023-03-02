import { NavLink } from "react-router-dom";
import { logout } from "../store/session";
import { useDispatch } from "react-redux";

const NavBar = () => {

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (

    <div className="w-full flex flex-row justify-evenly p-5">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <button onClick={handleLogout} >Log Out</button>
    </div>

  )

}

export default NavBar;