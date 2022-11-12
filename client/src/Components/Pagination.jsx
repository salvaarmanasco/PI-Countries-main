import React from "react";
import styles from "../Styles/Pagination.module.css";

export default function Paginado({
  countriesPerPage,
  allCountries,
  paginated,
}) {
  const pageNumbers = [];
  const pageSecToFinish = allCountries - 9;
  pageNumbers.push(1);

  for (let i = 2; i <= Math.ceil(pageSecToFinish / 10); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={styles.nav}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((n) => (
            <li key={n}>
              <a onClick={() => paginated(n)} className={styles.a}>
                {n}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
