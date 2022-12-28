import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ appName }) => {
  return (
    <div className={"headerComp"}>
      <h1 className="appLogo">{appName ?? "APP 1"}</h1>
      <div className="navLinkContainer">
        <Link to="/skill/list"> List </Link>
        <Link to="/skill/choose"> Choose </Link>
        <Link to="/skill/report"> Report </Link>
      </div>
    </div>
  );
};

export default Header;
