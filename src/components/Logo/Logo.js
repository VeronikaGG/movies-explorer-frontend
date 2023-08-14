import React from "react";
import { Link } from "react-router-dom";
import myLogo from "../../images/logo.svg";

const Logo = () => {
  return (
    <Link to="/">
      <img className="mylogo link-style" src={myLogo} alt="Логотип" />
    </Link>
  );
};

export default Logo;
