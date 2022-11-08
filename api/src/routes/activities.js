const { Router } = require("express");
const { Op } = require("sequelize");
const { Activities, Country } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  try {
    const [nuevaAct, created] = await Activities.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
      defaults: {
        difficulty,
        duration,
        season,
      },
    });

    const findCountryDB = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${country}%` },
      },
      include: Activities,
    });

    if (!findCountryDB.length) {
      return res.status(404).send(`El pais ingresado no existe`);
    }
    if (!created) {
      return res
        .status(200)
        .send(
          `La actividad ${name} con dificultad: ${difficulty}, duracion: ${duration} y estacion: ${season}, ya habia sido creada anteriormente `
        );
    }

    await nuevaAct.addCountry(findCountryDB);
    return res.status(200).send("La actividad fue creada");
  } catch (err) {
    return res.status(404).send("No se ha podido crear la actividad");
  }
});
//--------------------------------------------------GET--------------------------------------------------
const getActivitiesDB = async (req, res) => {
  const activitiesDB = Activities.findAll({ include: Country });
  return activitiesDB;
};

router.get("/", async (req, res) => {
  try {
    let result = await getActivitiesDB();
    return res.json(result);
  } catch (err) {
    return res.status(404).send("Error al buscar las actividades");
  }
});

module.exports = router;
