const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Worker = sequelize.define("workers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING(40),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });

    return Worker;
};
