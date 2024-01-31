import React,{useState} from "react";
import './style.css'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { Link } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
const Home = () => {

	return (
		<div className="home-body">
		<ContentWrapper>

			<h4 className="text-center text-white"> Welcome ! user <MdOutlineEmojiEmotions /> </h4>
			<div className="row pt-5">
				<div className="col-sm-6 mx-auto mb-3 mb-sm-0">
					<Link to="/auth/login" style={{ textDecoration: 'none' }}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center">User Access</h5>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</ ContentWrapper>
		</div>
	)
}

export default Home;
