"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareLink = exports.User = void 0;
const sequelize = require('../db');
const { DataTypes } = require('sequelize');
exports.User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    approve: { type: DataTypes.BOOLEAN, defaultValue: false },
    homeFolder: { type: DataTypes.STRING, unique: true }
});
exports.ShareLink = sequelize.define('sharelink', {
    uuid: { type: DataTypes.STRING, unique: true, undefined: false },
    type: { type: DataTypes.STRING, defaultValue: 'file' },
    path: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    timelive: { type: DataTypes.DATE },
    pincode: { type: DataTypes.STRING },
});
module.exports = {
    User: exports.User,
    ShareLink: exports.ShareLink
};
