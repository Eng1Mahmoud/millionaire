import React from "react";
import image1 from "../../../dist/images/image-1.png";
import image2 from "../../../dist/images/image-2 (1).png";
import Forms from "./Forms";

function Login() {

  return (
    <div className="login ">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="content d-flex ">
          <div className="img align-self-end d-none d-md-block">
            <img src={image1} alt="vector" className="img-fluid img1" style={{height:"250px"}}></img>
          </div>

          <div className="form  rounded-2">
            <Forms />
          </div>
          <div className="img align-self-end d d-none d-md-block">
            <img src={image2} alt="vector" className="img-fluid img2 " style={{height:"150px"}}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
