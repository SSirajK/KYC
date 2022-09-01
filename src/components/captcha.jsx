import React, { useContext, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { BeatLoader } from "react-spinners";
import Loginbutton from "./loginbutton";
import { RiRefreshLine } from "react-icons/ri";
import "./warper.css";
import { IoIosArrowBack } from "react-icons/io";

const Captcha = () => {
  const { captcha, token } = useContext(TokenContext);
  const [input, setInput] = useState("");
  const toast = useToast();
  // const { authkey } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { captchaAuth } = useContext(TokenContext);
  const authkey = sessionStorage.getItem('authkey')

  // const backPage = () => {
  //   navigate("/");
  // };

  const handleRefresh = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "https://app.syntizen.com/api/sws/refresh-captcha",
      data: {
        token: token,
      },
      headers: {
        apikey: " ",
        authkey: authkey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        captchaAuth(res.data.captcha);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "https://app.syntizen.com/api/sws/gen-otp",
      data: {
        token: token,
        captcha: input,
      },
      headers: {
        apikey: " ",
        authkey: authkey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(true)
        if (res.data.respcode != 200) {
          toast({
            title: "Incorrect Captcha",
            description: res.data.respdesc,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
        } else {
          toast({
            title: "Captcha Success",
            description: "Login Successful",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setIsLoading(false);
          navigate("/genotp", { replace: true });
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const backPage = () => {
    navigate("/aadhar ", { replace: true });
  };

  return (
    <div className={`${isLoading ? "opague" : "aadhar"}`}>
      <div id="main">
        <div id="header">
          <IoIosArrowBack onClick={backPage} />
          <p>KYC</p>
        </div>
        <hr />
        <h3 className='head'>Captcha code verification</h3>
        {/* <Loginbutton login={backPage} /> */}
        <div className="refresh">
          <img
            className="image"
            src={`data:image/png;base64,${captcha}`}
            alt=""
          />
          <div className="captcharef">
            <p className='smallcap'>Can't read the captcha</p>
            <div className="refreshbtn">
              <RiRefreshLine onClick={handleRefresh} />
              <h5>Refresh</h5>
            </div>
          </div>
        </div>
        <input
          className="inputcap"
          type="text"
          name=""
          id=""
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key == "Enter" && handleSubmit()}
          placeholder="Enter Captcha value"
        />
        <button onClick={handleSubmit} className="proceed margin-top">Continue</button>
        {isLoading && (
          <BeatLoader className="loading" size={12} color="black" />
        )}
      </div>
    </div>
  );
};

export default Captcha;
