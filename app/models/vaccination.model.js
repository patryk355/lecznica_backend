const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Vaccination = sequelize.define("vaccinations", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        serial_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        apply_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        expiration_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
    });

    return Vaccination;
};
