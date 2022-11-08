import React from "react";
import styles from "../Styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, flag, region, population, area, id }) {
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
            <h2>{name}</h2>
            <h4>{region}</h4>
            {/* <h5>Population: {population}</h5>
            <h5>Area: {area}</h5> */}
            <Link to={"/countries/" + { id }}>Details</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
