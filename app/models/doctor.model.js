const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctors", {
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
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        license_number: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    });

    return Doctor;
};
