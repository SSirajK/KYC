import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import "./warper.css";
import { useToast, Button } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import { TokenContext } from "../Context/TokenContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Loginbutton from "./loginbutton";
import { IoIosArrowBack } from "react-icons/io";

const Aadhar = () => {
  const [aadharNum, setAadharNum] = useState("");
  const toast = useToast();
  // const { authkey } = useContext(AuthContext);
  const { tokenAuth } = useContext(TokenContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { captchaAuth } = useContext(TokenContext);
  const authkey = sessionStorage.getItem('authkey')

  const handleChange = (e) => {
    setAadharNum(e.target.value);
  };

  const handleSubmit = () => {
    if (aadharNum.length != 12) {
      toast({
        title: "Not 12 digit",
        description: "Enter 12 digit Aadhar Number",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      axios({
        method: "post",
        url: "https://app.syntizen.com/api/sws/getCaptcha",
        data: {
          aadhaar_no: aadharNum,
        },
        headers: {
          apikey: " ",
          authkey: authkey,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.data.respcode != 200) {
            toast({
              title: "",
              description: res.data.respdesc,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setIsLoading(false);
          } else {
            toast({
              title: "Welcome",
              description: "xin Successful",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            tokenAuth(res.data.token);
            captchaAuth(res.data.captcha)
            setIsLoading(false);
            navigate("/captcha", { replace: true });
            
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const backPage = () => {
    navigate('/consent', { replace: true })
  }
  return (
    <div className={`${isLoading ? "opague" : "aadhar"}`}>
      <div id="main">
      {/* <Loginbutton login={backPage} /> */}
      <div id="header">
        <IoIosArrowBack onClick={backPage}/>
        <p>KYC</p>
      </div>
      <hr/>
      <h3>Enter your Aadhar number<p className="red">&nbsp;*</p></h3>
      <p className="small">Please Enter your 12 digit unique identification no</p>
      <Popup
        trigger={
          <input
            className="input"
            type="number"
            value={aadharNum}
            onChange={handleChange}
            onKeyPress={(e)=> (e.key == "Enter") && handleSubmit()}
          />
        }
        on="focus"
        closeOnDocumentClick
      >
        {/* <span>Enter 12 Digit Aadhar Number </span> */}
      </Popup>
      <p className="small">We'll send an aadhar OTP for verification</p>
       {/* <Button
        className="button colorful"
        colorScheme="blue"
        size="sm"
        onClick={handleSubmit}
      >
        <h4 className="gradient"></h4>
        Get Captcha
      </Button> */}
      <div className="margin-top">

<button
        className="proceed"
        onClick={handleSubmit}
      >
        Continue
      </button>
      </div>
      {/* <button onClick={aadharn}>Submit</button> */}
      {
        isLoading && <BeatLoader className="loading" size={12} color="black" />
      }
    </div>
    </div>
  );
};

export default Aadhar;
