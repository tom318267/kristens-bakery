import React from "react";
import { Link } from "react-router-dom";
import dessertLogo from "../../assets/dessertLogo.png";
import wave from "../../assets/wave.png";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="HomePage">
      <div className="home-container animate__animated animate__jackInTheBox">
        <h1>Kristen's Bakery</h1>
        <h2>Freshly baked all day. Everyday!</h2>
        <Link to="/sign-in">
          <button>Get Started</button>
        </Link>
        <img src={dessertLogo} alt="dessert" />
      </div>
      <img id="wave" src={wave} alt="wave" />
    </div>
  );
};

export default Homepage;
