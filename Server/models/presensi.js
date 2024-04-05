'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Presensi.belongsTo(models.Pesertas, {
      //   foreignKey: 'p_id', // Name of the foreign key in Presensi table
      //   as: 'peserta_Magang', // Alias for the association
      // });
    }
  }
  Presensi.init({
    tanggal: DataTypes.DATEONLY,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    image_url_in: DataTypes.STRING,
    image_url_out: DataTypes.STRING,
    p_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Presensi',
  });
  return Presensi;
};