const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config'); // Your Sequelize configuration

class ShortenUrls extends Model {}

ShortenUrls.init({
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  sequelize,
  modelName: 'ShortenUrls',
  timestamps: true, // This will add createdAt and updatedAt fields automatically
});

module.exports = ShortenUrls;
