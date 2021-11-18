const {DataTypes} = require("sequelize");
const db = require("../db");

    const Task = db.define('task', {
        // userId: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expectedSol: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        solved: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        solutionDetails: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        // },
        // owner_id: {
        //     type: DataTypes.INTEGER,
            
        // }
    });

    module.exports = Task;