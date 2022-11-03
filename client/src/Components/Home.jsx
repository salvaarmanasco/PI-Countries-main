import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import styles from "../Styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const lastCountry = currentPage * countriesPerPage;
  const firtsCountry = lastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(firtsCountry, lastCountry);

  function pagination(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <>
      <div className={styles.home}>
        <h1>COUNTRIES</h1>
        <Link to="/activities"> Crear Actividad</Link>
      </div>
      <div className={styles.home}>
        <button
          onClick={(e) => {
            handleOnClick(e);
          }}
        >
          Recargar pagina
        </button>
      </div>
      <div className={styles.home}>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <div>
        <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
        />
      </div>
      {currentCountries &&
        currentCountries.map((c) => {
          return (
            <div>
              <div>
                <Card
                  name={c.name}
                  flag={c.flag}
                  region={c.region}
                  population={c.population}
                  area={c.area}
                  id={c.id}
                />
              </div>
            </div>
          );
        })}
      <Card />
    </>
  );
}
