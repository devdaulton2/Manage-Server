const Comment = require("./commentmodel");
const Task = require("./taskmodel");
const User = require("./usermodel");

User.hasMany(Task);
User.hasMany(Comment);

Task.belongsTo(User);
Comment.belongsTo(User);

// Task.hasMany(Comment);
// Comment.belongsTo(Task);

module.exports = {
    Comment,
    Task,
    User
}