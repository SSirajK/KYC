import React, { useContext } from "react";
import "./warper.css";
import { DataContext } from "../Context/DataContext";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { TalhaPic } from "../Imagees/Imagesurl";

const KYCdetails = () => {
  const { datas } = useContext(DataContext);
  const navigate = useNavigate();
  console.log(datas);
  const photos = datas.pht;
  const photo = `data:image/png;base64,${photos}`;
  const name = datas.name;
  const dob = datas.dob;
  const father = datas.careof;
  const aadhaarnumber = datas.uid;
  const address = datas.house+" "+datas.street+" "+datas.loc+" "+datas.po+" "+datas.dist+" "+"-"+" "+datas.pc;

  const backPage = () => {
    navigate("/details", { replace: true });
  };

  return (
    <div id="main">
      <div id="header">
        <IoIosArrowBack onClick={backPage} />
        <p>KYC</p>
      </div>
      <hr />
      <h3>Aadhar Details</h3>
      <p className="small">Please confirm your aadhar details to proceed</p>
      <div className="detailscontainer">
        <div className="flex">
          <img
            src={photo ? photo : TalhaPic}
            style={{
              borderRadius: "50%",
              height: "72px",
              margin: "12px",
              width: "72px",
            }}
            alt=""
          />
          <div>
            <h4 style={{margin: '10px 0px 0px 0px', textAlign:'left'}}>&nbsp;{name ? name : "Mahip Chaudhary"}</h4>
            <div className="flex">
              <p
                className="small"
                style={{ fontSize: "16px", margin: "0px 0px 0px 4px", padding: "0px" }}
              >
                DOB :
              </p>
              <h4 style={{ lineHeight: "25px" }}>
                &nbsp;{dob ? dob : "21-05-1997"}
              </h4>
            </div>
            <div className="flex">
              <p className="small" style={{fontSize: '13px', margin:'0px 0px 0px 4px', padding:'0px'}}>
                Father's Name : 
              </p>
              <h6 style={{fontSize: '13px'}}>{father?father:'Rajeev Chaudhary'}</h6>
            </div>
          </div>
        </div>
        <hr style={{borderTop: '1px solid #b1b1b1'}}/>
        <div style={{marginTop:'5px'}}>
          <div className="flex"><p style={{ fontSize: "16px", margin: "0px 0px 0px 10px", padding: "0px", opacity:'0.5' }}>Aadhar No : 
          </p><h4>&nbsp;{aadhaarnumber?aadhaarnumber:'578639958993'}</h4></div>
          <div className="flex">
            <p className="small" style={{fontSize: '13px', margin:'0px 0px 0px 10px', padding:'0px'}}>
                Address : 
            </p>
            <h6 style={{fontSize: '13px', textAlign:'left'}}>&emsp;{address?address:'#15, hvdaudajk, asuffasbvfj ssduoas, Bangalore-563468'}</h6>
          </div>
        </div>
      </div>
      {/* <div className='detailscontainer'>
        { <img src={`data:image/png;base64,${photo}`} alt="" />}
            <div>
            <img src={photo?photo:TalhaPic} style={{borderRadius: '50%', height:'72px', margin:'12px', width:'72px'}} alt="" />
                <div>Hello</div>
                <div></div>
                <div></div>
            </div>
            <div>
              <div>ello</div>
              <div>llo</div>
            </div>
        </div> */}
    </div>
  );
};

export default KYCdetails;
