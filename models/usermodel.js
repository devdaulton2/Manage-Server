const {DataTypes} = require("sequelize");
const db = require("../db");

    const User = db.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        // isAdmin: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // },
        accessCode: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    module.exports = User;