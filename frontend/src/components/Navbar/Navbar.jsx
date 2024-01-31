import React, { useContext } from "react";
import { IoMdExit } from "react-icons/io";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import './style.css'
const Navbar = () => {
	const navigate = useNavigate()
	const { user, setUser } = useContext(UserContext);
	console.log(`the user details are ${user}`)

	const handleLogout = async (e) => {
		try {
			e.preventDefault();
			// Make a POST request to the logout endpoint
			const response = await axios.post('/auth/logout', {}, { withCredentials: true });
			if (response.data.success) {
			  console.log(response.data.message);
			  toast.success('Logout Successful')
			  navigate(`/auth/login`);
			} else {
			  console.error('Logout failed:', response.data.message);
			}
		  } catch (error) {
			console.error('Error during logout:', error.message);
		  }
	};

	return (
		<div className="bg-dark">
					<ContentWrapper>
					<nav className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<a className="navbar-brand text-white" href="#">
				Workify
				</a>
				<button
					className="navbar-toggler bg-white"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					{/* Add the ms-auto class to push the list items to the end */}
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="profile-pic">
			<img src={user ? user.user.picture : 'null'} alt="Profile Picture" />
             </div>
            <i className="fas fa-user"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" onClick={handleLogout}> Log Out <IoMdExit /></a></li>
          </ul>
        </li>
     </ul>
				</div>
			</div>
		</nav>
		</ContentWrapper>
		</div>

	)
}

export default Navbar
