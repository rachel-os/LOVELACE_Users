"use strict";
exports.__esModule = true;
var users_1 = require("../models/users");
// je regroupe mes instances...
var existingUsers = [
    new users_1["default"]('John', 'Doe', 'john.doe@mail.com'),
    new users_1["default"]('Jane', 'Dupont', 'jane.dupont@mail.com'),
    new users_1["default"]('Charlie', 'Tango', 'charlie.tango@mail.com')
];
// et les fonctions dans le Controller.
var findUser = function (userId) {
    return existingUsers.find(function (user) {
        return user.id == userId;
    });
};
function createUser(firstname, lastname, email) {
    var user = new users_1["default"](firstname, lastname, email);
    existingUsers.push(user);
}
function deleteUser(userToDelete) {
    existingUsers = existingUsers.filter(function (user) {
        return user.id != userToDelete.id;
    });
}
exports["default"] = {
    findUser: findUser,
    createUser: createUser,
    deleteUser: deleteUser
};
