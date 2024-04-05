'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Status_tugas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      p_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Peserta_Magangs', // Nama tabel lain yang akan dijadikan referensi
          key: 'id',          // Nama kolom yang akan dijadikan referensi
        }
      },
      t_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tugas', // Nama tabel lain yang akan dijadikan referensi
          key: 'id',          // Nama kolom yang akan dijadikan referensi
        }
      },
      tugas_url: {
        type: Sequelize.STRING
      },
      status_pengerjaan: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Status_tugas');
  }
};