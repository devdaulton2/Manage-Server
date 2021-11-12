const {DataTypes} = require("sequelize");
const db = require("../db");

    const Comment = db.define('comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
    module.exports = Comment;