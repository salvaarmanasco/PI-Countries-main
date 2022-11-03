const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://www.pchardwarepro.com/wp-content/uploads/2019/03/mac-globe-terrestre-blocage.jpg",
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
