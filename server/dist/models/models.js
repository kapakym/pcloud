"use strict";
const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    approve: { type: DataTypes.BOOLEAN, defaultValue: false },
    homeFolder: { type: DataTypes.STRING, unique: true }
});
module.exports = {
    User
};
