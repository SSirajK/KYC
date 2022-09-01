import React, { useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const One = () => {
  const navigate = useNavigate();
  const [isChecked, setIschecked] = useState(false);
  const { logAuth } = useContext(AuthContext)

  const handleClick = () => {
    navigate("/aadhar", { replace: true });
  };

  const handleback = () => {
    navigate('/', {replace: true})
  }

  return (
    <div id="main">
      <div id="header">
        <IoIosArrowBack onClick={handleback}/>
        <p>KYC</p>
      </div>
      <hr />
      <div id="consent-info">
        <strong>User Consent</strong>
        <ul>
          <li>
            Allow Khyaal's PPI issuer to record the video, capture a live
            photograph, use live location
          </li>
          <li>
            Provide access to Aadhar and PAN card details for the purpose of
            verification
          </li>
          <li>Ensure that the details entered are correct and true</li>
        </ul>
      </div>
      <div className="margin-top">
      <p id="terms">
        <label>
        <input
          type="checkbox"
          onClick={() => setIschecked(!isChecked)}
          value={isChecked}
        />
        I agree to the terms and conditions above
      </label>  
      </p>
      <button
        className="proceed"
        onClick={handleClick}
        disabled={isChecked == false ? true : false}
      >
        Proceed
      </button>
      </div>
    </div>
  );
};

export default One;
