import React from "react";
import styles from "../styles/header.module.scss";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Header;
