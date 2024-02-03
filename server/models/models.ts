const sequelize = require('../db')
const {DataTypes} = require('sequelize')

export interface IShareLink {
    uuid: string,
    type: string,
    path: string,
    name: string
    timelive: string,
    pincode: string,
}

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'user'},
    approve: {type: DataTypes.BOOLEAN, defaultValue: false},
    homeFolder: {type: DataTypes.STRING, unique: true}
})

export const ShareLink = sequelize.define('sharelink', {
    uuid: {type: DataTypes.STRING, unique: true, undefined: false},
    type: {type: DataTypes.STRING, defaultValue: 'file'},
    path: {type:DataTypes.STRING},
    name: {type:DataTypes.STRING},
    timelive: {type: DataTypes.DATE},
    pincode: {type: DataTypes.STRING},
})

module.exports = {
    User,
    ShareLink
}

