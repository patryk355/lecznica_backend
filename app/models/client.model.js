const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        postcode: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        street_number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    });

    return Client;
};
