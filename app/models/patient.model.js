const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patients", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        species: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        strain: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        coloration: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        drugs: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        allergies: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
    });

    return Patient;
};
