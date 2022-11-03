const { Router } = require("express");
// Importar todos los routers;
const countriesRoute = require("./countries");
const activitiesRoute = require("./activities");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countriesRoute);
router.use("/activities", activitiesRoute);

module.exports = router;
