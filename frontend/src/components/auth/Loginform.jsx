import React, {useState} from "react";
import {toast} from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import person from '../../assets/images/person.png';
import { UserContext } from "../../Context/Context";
const Loginform = () => {
  const navigate = useNavigate()
	const { setUserId } = React.useContext(UserContext);
	const [login, setLogin] = useState({
		email: '',
		password: '',
	})

	const loginUser = async (e) => {
		e.preventDefault();
		const { email, password } = login;
		try {
		  const response = await axios.post('/auth/login', {
			email,
			password,
		  });
		  const { userId } = response.data;
		  setUserId(userId);
		  if (login.error) {
			toast.error(login.error);
		  } else {
      localStorage.setItem('userId', userId);
      localStorage.setItem('email', login.email);

			setLogin({});
			toast.success('Login Successful. Welcome!');

			// Use the updated userId here
			navigate(`/auth/profile/${userId}`);
		  }
		} catch (error) {
		  console.error(error);
		}
	  };

  return (
    <div className="body-background">
            <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="body-card">
      <div className="text-center pb-5">
        <Link to="/auth/signUp" style={{ textDecoration: 'none' }}>
          <h1 className="sign-card">SIGN UP</h1>
        </Link>
      </div>
      <div className="img-class pb-4 text-center">
        <img src={person} alt="" />
      </div>
      <form onSubmit={loginUser} id="loginForm">
        <div className="mb-3">
          <input
            type="email"
            id="username"
            placeholder="Enter your email"
            autoComplete="email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="form-control"
          />
          <div id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between pb-3">
          <div className="left-section">
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
          </div>
          <div className="right-section">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
        <input type="submit" value="LOGIN" className="btn btn-primary" />
      </form>
    </div>
  </div>
    </div>
  );
};

export default Loginform;
