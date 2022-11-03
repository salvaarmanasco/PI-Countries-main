import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";

export default function LandingPage() {
  return (
    <>
      <div className={styles.landingPage}>
        <h1>Bienvenidos!</h1>
      </div>
      <div className={styles.landingPage}>
        <Link to="/home">
          <button className={styles.specialButton}>Ingresar</button>
        </Link>
      </div>
    </>
  );
}
