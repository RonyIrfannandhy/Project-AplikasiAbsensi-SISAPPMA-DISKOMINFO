'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tugas.hasMany(models.Status_tugas, {
        foreignKey: 't_id', // Name of the foreign key in Presensi table
      });

    }
  }
  Tugas.init({
    judul: DataTypes.STRING,
    tugas_url: DataTypes.STRING,
    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tugas',
  });
  return Tugas;
};