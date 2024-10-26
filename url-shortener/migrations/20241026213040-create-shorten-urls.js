'use strict';

// Migration file (20241026213040-create-shorten-urls.js)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ShortenUrls', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      originalUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shortUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      uniqueClicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // Unique clicks count
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ShortenUrls');
  },
};

