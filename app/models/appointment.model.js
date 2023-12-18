const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
    });

    return Appointment;
};
