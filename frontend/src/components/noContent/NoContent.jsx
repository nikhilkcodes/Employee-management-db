import React from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Nodata from "../../assets/images/Nodata.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./style.css";
import { useNavigate } from 'react-router-dom';

const NoContent = () => {
	const navigate = useNavigate();
	const redirectToLogin = () => {
		navigate('/auth/login')
	   }

  return (
    <ContentWrapper>
      <div className="text-white text-center">
        <h1>
          Ahmmm.... We see you're not logged in. Please login.
        </h1>
        <div className="nodata">
          <img src={Nodata} alt="No Data Available" />
        </div>
	    <button type="button" className="btn btn-outline-light" onClick={redirectToLogin}>Login Page <FaExternalLinkAlt /></button>
      </div>
    </ContentWrapper>
  );
};

export default NoContent;
