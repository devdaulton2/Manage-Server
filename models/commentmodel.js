module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
    return Comment;
}