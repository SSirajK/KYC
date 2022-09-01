import React, { useContext, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { DataContext } from "../Context/DataContext";
import { BeatLoader } from "react-spinners";
import Loginbutton from "./loginbutton";
import { IoIosArrowBack } from "react-icons/io";

const Otp = () => {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const toast = useToast();
  // const { authkey } = useContext(AuthContext);
  const { token } = useContext(TokenContext);
  const { dataAuth } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authkey = sessionStorage.getItem('authkey')

  let otp;

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      console.log("next");

      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };
  const backPage = () => {
    navigate("/captcha", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    otp = otp1+otp2+otp3+otp4+otp5+otp6;
    setIsLoading(true);

    axios({
      method: "POST",
      url: "https://app.syntizen.com/api/sws/get-data",
      data: {
        token: token,
        otp: otp,
        sharecode: "1234",
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
            title: "Incorrect OTP",
            description: res.data.respdesc,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
        } else {
          toast({
            title: "OTP success",
            description: "OTP Entered Successfully",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          dataAuth(res.data.aadhaar_details);
          setIsLoading(false);
          navigate("/details", { replace: true });
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={`${isLoading ? "opague" : "aadhar"}`}>
      {/* <Loginbutton login={backPage} /> */}
      <div id="main">
        <div id="header">
          <IoIosArrowBack onClick={backPage} />
          <p>KYC</p>
        </div>
        <hr />
        <h3 className="otp">
          Enter the 6-digit OTP sent to your registered number
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="1"
            inputMode="numeric"
            id="otp"
            pattern="[0-9]*"
            value={otp1}
            maxLength={1}
            onChange={(e) => {
              setOtp1(e.target.value);
              console.log(e.target.value);
            }}
            tabIndex="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            type="text"
            name="2"
            inputMode="numeric"
            id="otp"
            pattern="[0-9]*"
            maxLength={1}
            value={otp2}
            onChange={(e) => setOtp2(e.target.value)}
            tabIndex="2"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            type="text"
            name="3"
            inputMode="numeric"
            id="otp"
            pattern="[0-9]*"
            maxLength={1}
            value={otp3}
            onChange={(e) => setOtp3(e.target.value)}
            tabIndex="3"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            type="text"
            name="4"
            maxLength={1}
            inputMode="numeric"
            id="otp"
            pattern="[0-9]*"
            value={otp4}
            onChange={(e) => setOtp4(e.target.value)}
            tabIndex="4"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            type="text"
            name="5"
            maxLength={1}
            inputMode="numeric"
            id="otp"
            pattern="[0-9]*"
            value={otp5}
            onChange={(e) => setOtp5(e.target.value)}
            tabIndex="5"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            type="text"
            name="6"
            maxLength={1}
            inputMode="numeric"
            id="otp"
            pattern="[0-9]*"
            value={otp6}
            onChange={(e) => setOtp6(e.target.value)}
            tabIndex="6"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input type="submit" className="proceed margin-top" value='continue'/>
        </form>
        {isLoading && (
          <BeatLoader className="loading" size={12} color="black" />
        )}
      </div>
    </div>
  );
};

export default Otp;

// import React, { useContext, useState } from 'react'
// import { TokenContext } from '../Context/TokenContext';
// import { useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';

// const Captcha = () => {
//     const {captcha,token} = useContext(TokenContext)
//     const [otp,setOtp] = useState('')
//     const toast = useToast()
//     const { authkey } = useContext(AuthContext)
//     const { tokenAuth } = useContext(TokenContext)
//     const navigate = useNavigate()

//     const handleSubmit=()=> {
//         console.log(input,'cap')
//         console.log(token,'tokens')
//         console.log(authkey,'authkey')
//                 axios({method: 'post',
//       url: 'https://app.syntizen.com/api/sws/get-data',
//       data: {
//         token: token,
//         otp: otp,
//         sharecode: '1234'
//       },
//       headers: {
//         apikey: ' ',
//         authkey: authkey,
//         'Content-Type': 'application/json'
//             },
//         }).then((res)=>{
//             console.log(res)
//             if(res.data.respcode != 200){
//                 toast({
//                     title: 'Incorrect Aadhar Number',
//                     description: res.data.respdesc,
//                     status: 'error',
//                     duration: 9000,
//                     isClosable: true,
//                   })
//             }
//             else{
//                 toast({
//                     title: 'Aadhar Success',
//                     description: "Login Successful",
//                     status: 'success',
//                     duration: 1000,
//                     isClosable: true,
//                   })
//                    navigate('/genotp',{ replace: true })
//             }
//         })

//         .catch(function (error) {
//             console.log(error);
//            });
//         }

//   return (
//     <div>
//         <img src={`data:image/png;base64,${captcha}`} alt="" />
//         <input type="text" name="" id="" value={input} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter The Captcha Above'/>
//         <button onClick={handleSubmit}>Submit</button>
//     </div>
//   )
// }

// export default Otp;
