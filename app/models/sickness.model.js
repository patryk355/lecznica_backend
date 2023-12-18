const {DataTypes} = require('sequelize');
const Patient = require('./patient.model');

module.exports = (sequelize, Sequelize) => {
    const Sickness = sequelize.define("sicknesses", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    });


    return Sickness;
};
