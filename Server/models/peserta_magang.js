'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peserta_Magang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Peserta_Magang.hasMany(models.Presensi, {
        foreignKey: 'p_id', // Name of the foreign key in Presensi table
        as: 'presensimagang', // Alias for the association
      });
      Peserta_Magang.hasMany(models.Status_tugas, {
        foreignKey: 'p_id', // Name of the foreign key in Presensi table
        as: 'status_tugas', // Alias for the association
      });
    }
  }
  Peserta_Magang.init({
    nama: DataTypes.STRING,
    asal_univ: DataTypes.STRING,
    asal_jurusan: DataTypes.STRING,
    no_telp : DataTypes.STRING,
    tanggal_mulai: DataTypes.DATEONLY,
    tanggal_selesai: DataTypes.DATEONLY,
    status_aktif: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshTokens: DataTypes.STRING    
  }, {
    sequelize,
    modelName: 'Peserta_Magang',
  });
  return Peserta_Magang;
};
