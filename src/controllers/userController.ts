import User from "../models/users";

// je regroupe mes instances...
let existingUsers = [
  new User('John', 'Doe', 'john.doe@mail.com'),
  new User('Jane', 'Dupont', 'jane.dupont@mail.com'),
  new User('Charlie', 'Tango', 'charlie.tango@mail.com')
]

// et les fonctions dans le Controller.
const findUser = (userId: string) => {
  return existingUsers.find((user) => {
    return user.id == userId
  });
}

function createUser(firstname: string, lastname: string, email: string){
  const user = new User(firstname, lastname, email);
  existingUsers.push(user);
}

function deleteUser(userToDelete: User){
  existingUsers = existingUsers.filter((user) => {
    return user.id != userToDelete.id
  });
}

export default {
  findUser,
  createUser,
  deleteUser
}