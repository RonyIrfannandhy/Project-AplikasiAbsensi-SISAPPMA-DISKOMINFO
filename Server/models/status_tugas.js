'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status_tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status_tugas.belongsTo(models.Peserta_Magang, {
        foreignKey: 'p_id', // Name of the foreign key in Presensi table
        
      });
      Status_tugas.belongsTo(models.Tugas, {
        foreignKey: 't_id', // Name of the foreign key in Presensi table
        as: 'tugas'
      });

    }
  }
  Status_tugas.init({
    p_id: DataTypes.INTEGER,
    t_id: DataTypes.INTEGER,
    tugas_url: DataTypes.STRING,
    status_pengerjaan: DataTypes.BOOLEAN,
    keterangan: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Status_tugas',
  });
  return Status_tugas;
};