'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presensis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      check_in: {
        type: Sequelize.DATE
      },
      check_out: {
        type: Sequelize.DATE
      },
      image_url_in: {
        type: Sequelize.STRING
      },
      image_url_out: {
        type: Sequelize.STRING
      },
      p_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Peserta_Magangs', // Nama tabel lain yang akan dijadikan referensi
          key: 'id',          // Nama kolom yang akan dijadikan referensi
        },
        onDelete: 'CASCADE',   // Opsi ketika data di tabel referensi dihapus
        onUpdate: 'CASCADE',   // Opsi ketika data di tabel referensi diperbarui
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
    await queryInterface.dropTable('Presensis');
  }
};