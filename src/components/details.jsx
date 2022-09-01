import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import Loginbutton from "./loginbutton";
import './warper.css'

const Details = () => {
  const { datas } = useContext(DataContext);
  let navigate = useNavigate();
  console.log(datas);
  const photo = datas.pht;
  const careof = datas.careof;
  const country = datas.country;
  const district = datas.dist;
  let gender;
  const dob = datas.dob;
  const address = datas.house;
  const location = datas.loc;
  const name = datas.name;
  const pc = datas.pc;
  const po = datas.po;
  const state = datas.state;
  const street = datas.street;
  const subdist = datas.subdist;
  const aadhaarnumber = datas.uid;
  const vtc = datas.vtc;
  if(datas.gender=='M'){
    gender = 'Male'
  }
  else{
    gender = 'Female'
  }
  const handleClick = () => {
    navigate('/kycdetails', {replace: true})
  }

  return (
     <div className="aadhar" style={{ textAlign: "left" }}>
       <div id="main">
         <p id="header" style={{ fontSize: "20px" }}>
            Aadhar Details
         </p>
        {/* <Loginbutton login={backPage} /> */}
        <table>
          <tr>
            <th className='thead'>Key</th>
            <th className="thead1">Value</th>
          </tr>
          <tr>
            <td>Care Of</td>
            <td>{careof}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>District</td>
            <td>{district}</td>
          </tr>
          <tr><td>Date Of Birth</td>
          <td>{dob}</td></tr>
          <tr><td>Gender</td>
          <td>{gender}</td></tr>
          <tr><td>Address</td>
          <td>{address}</td></tr>
          <tr><td>Location</td>
          <td>{location}</td></tr>
          <tr><td>Name</td>
          <td>{name}</td></tr>
          <tr><td>Postal Code</td>
          <td>{pc}</td></tr>
          <tr><td className="phototable">Photo</td>
          <td className='photo'><img src={`data:image/png;base64,${photo}`} alt="" /></td></tr>
          <tr><td>Post Office</td>
          <td>{po}</td></tr>
          <tr><td>State</td>
          <td>{state}</td></tr>
          <tr><td>Street</td>
          <td>{street}</td></tr>
          <tr><td>Sub District</td>
          <td>{subdist}</td></tr>
          <tr><td>Aadhaar Number</td>
          <td>{aadhaarnumber}</td></tr>
          <tr><td>vtc</td>
          <td>{vtc}</td></tr>
        </table>
       </div>
       <button className="proceed" onClick={handleClick}>Proceed</button>
     </div>
  );
};

export default Details;
