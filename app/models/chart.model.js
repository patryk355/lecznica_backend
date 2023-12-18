const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Chart = sequelize.define("charts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });

    return Chart;
};
