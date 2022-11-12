import React from "react";
import styles from "../Styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, flag, region, id }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <section className={styles.header}>
            <img
              src={flag}
              alt="Imagen no encontrada"
              width="150px"
              height="100px"
            />
            <h2>{name.toUpperCase()}</h2>
            <h4>{region}</h4>
            <Link to={"/countries/" + id}>Detail</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
