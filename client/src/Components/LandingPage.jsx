import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.landingPage}>
        <h1>WELCOME TO COUNT(TRIES)!</h1>
      </div>
      <div className={styles.landingPage}>
        <Link to="/home">
          <button className={styles.specialButton}>GET INTO</button>
        </Link>
      </div>
      <div className={styles.gif}>
        <iframe
          src="https://giphy.com/embed/xiOgHgY2ceKhm46cAj"
          width="480"
          height="360"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
