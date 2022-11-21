const { Router } = require("express");
const axios = require("axios");
const { Country, Activities } = require("../db");
const { Op } = require("sequelize");
const router = Router();

const getCountry = async () => {
  const axiosCountry = await axios.get("https://restcountries.com/v3/all");
  const mapCountry = await axiosCountry.data.map((c) => {
    return {
      id: c.cca3,
      name: c.name.common != null ? c.name.common : "Name not found",
      flag: c.flags[0] !== null ? c.flags[0] : "Image not found",
      region: c.region !== null ? c.region : "Region not found",
      capital:
        typeof c.capital !== "undefined" ? c.capital[0] : "Capital not found",
      subregion: c.subregion,
      area: c.area,
      population: c.population,
    };
  });
  return mapCountry;
};

const arrCountries = async () => {
  const countries = await getCountry();
  for (let i = 0; i < countries.length; i++) {
    await Country.create(countries[i]);
  }
  console.log("Se agregaron los paises a la BD");
};

arrCountries();

const getCountriesDB = async (req, res) => {
  const countriesDB = Country.findAll({ include: Activities });
  return countriesDB;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let result = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Activities,
      });

      if (result.length == 0) {
        return res.status(404).send("No se encontro el pais");
      }

      return res.json(result);
    } else {
      let result = await getCountriesDB();
      return res.json(result);
    }
  } catch (err) {
    return res.status(404).send("Error al buscar los paises");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length !== 3) {
    return res.status(404).send("El ID debe tener 3 caracteres");
  }

  const pattern = new RegExp("^[A-Z]+$", "i");

  if (!pattern.test(id)) {
    return res.status(404).send("Solo acepta valores de la A a la Z");
  }

  try {
    let result = await Country.findAll({
      where: {
        id: {
          [Op.like]: `%${id.toUpperCase()}%`,
        },
      },
      include: Activities,
    });

    if (result.length == 0) {
      return res.status(404).send("No se encontro el pais");
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(404).json("Error al buscar el pais");
  }
});

module.exports = router;
