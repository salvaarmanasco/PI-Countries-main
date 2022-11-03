const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Activities",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
      },
    },
    { timestamps: false }
  );
};
