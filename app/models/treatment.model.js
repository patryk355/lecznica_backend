const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Treatment = sequelize.define("treatments", {
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
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    });

    return Treatment;
};
