import React from "react";
import spinner from "../../assets/spinner.jpg";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="Spinner">
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
