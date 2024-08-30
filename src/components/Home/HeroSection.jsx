import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import bgImage from "../../assets/bg1.jpg";  // Import the image correctly
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/job/getall'); 
  };
  return (
    <div
      className="heroSection"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '75px 0 50px 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="container">
        <div className="title">
          <h1>FIND A JOB</h1>
          <h2>Using YOURHR</h2>
          <button className="btn" onClick={handleClick}>APPLY JOBS</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
