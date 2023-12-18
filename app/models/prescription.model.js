const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Prescription = sequelize.define("prescriptions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        drug_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dose: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        packages_amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Prescription;
};
