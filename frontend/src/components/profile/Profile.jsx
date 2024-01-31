import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/Context";
import Navbar from "../Navbar/Navbar";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Loading from "../loading/Loading";
import axios from "axios";
import "./style.css"

const Profile = () => {
	const { user, setUser } = useContext(UserContext)

	const [allUser, setAllUser] = useState([])


	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const response = await axios.get(`/auth/allUsers`);
				setAllUser(response.data);
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		};

		// Call the function here
		fetchAllUsers();
	}, []);

	return (
		<div className="profileBody">
			<Navbar />
			<ContentWrapper >
			<div className="text-white d-flex justify-content-center align-items-center flex-column">
          {user ? (
            <>
              <h1 className='text-dark font-weight-bold text-center'>Welcome! {user.user.name}</h1>

              <div className="container mt-4">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card" style={{width: "15rem"}}>
                      <img
                        src={user.user.picture}
                        alt="User Avatar"
                        className="card-img-top"
                      />
                    </div>

                  </div>

                  <div className="col-md-8 pb-3">
                    <div className="card fw-bold">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">User Details</h5>
                        <div className="card-body">
                          <div>
                            <h5 className="fw-bold">Name: {user.user.name} &nbsp;</h5>
                          </div>
                          <p>Date of Birth: {user.user.date}</p>
                          <p>Email: {user.user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <table className="table table table-hover mt-3">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {allUser.map((userData, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td><img className="profile-pic" src={userData.picture} alt="" />   {userData.name} {userData.name === user.user.name ? <span className="badge text-bg-primary">You</span> : ''}</td>
                      <td>{userData.date}</td>
                      <td>{userData.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <Loading />
          )}
        </div>
			</ContentWrapper>
		</div>
	)
}

export default Profile
