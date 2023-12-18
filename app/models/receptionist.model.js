const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Receptionist = sequelize.define("receptionists", {
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
        diploma_number: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    });

    return Receptionist;
};
