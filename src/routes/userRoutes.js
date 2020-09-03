const express = require ('express');
const serverExpress = express();
const port = 8000;
const bodyParser = require('body-parser');
serverExpress.use(bodyParser.json());
serverExpress.use(bodyParser.urlencoded({
  extended: true
}));
// serverExpress.set('view engine', 'ejs');

const User = require('../models/users');

let existingUsers = [
  new User('John', 'Doe', 'john.doe@mail.com'),
  new User('Jane', 'Dupont', 'jane.dupont@mail.com'),
  new User('Charlie', 'Tango', 'charlie.tango@mail.com')
]

serverExpress.get("/users/:userId", (request, response) => {
  const userId = request.params["userId"];
  console.log(`Details about user ${request.params["userId"]} are requested.`)  
  //TO DO : insérer condition pour check que userId soit toujours un nb

  const user = existingUsers.find((user) => {
    return user.id == userId
  });

  if(user == undefined) {
    response.status(404).send("User not found");
  } else {
    response.status(200).send(user);
  }
});

serverExpress.get ("/users", (request, response) => {
  response.status(200).send("Users' list");
});

serverExpress.get ("/", (request, response) => {
  response.send("Welcome to the index page.");
});

serverExpress.post ("/users", (request, response) => {
  const firstname = request.body["firstname"];
  const lastname = request.body["lastname"];
  const email = request.body["email"];

  const user = new User(firstname, lastname, email);
  existingUsers.push(user);
  response.status(201).send("New user added.");
});

serverExpress.patch("/users/:userId", (request, response) => {
  const firstname = request.body["firstname"];
  const lastname = request.body["lastname"];
  const email = request.body["email"];
  const userId = request.params["userId"];
  
  const user = existingUsers.find((user) => {
    return user.id == userId;
  });

  //si le user n'existe pas alors je renvoi une erreur
  if(user == undefined) {
    response.status(404).send("User not found");
  }

  //si aucun champ n'est renseigné alors renvoi d'une erreur au client.
  if (!firstname && !lastname && !email) {
    response.status(400).send("Please fill in the required field(s).")
  } 
  
  //si un des champs lastname, firstname ou email est modifié alors la valeur change.
  user.firstname = firstname ? firstname : user.lastname;
  user.lastname = lastname ? lastname : user.lastname;
  user.email = email ? email : user.email;
  
  // N.B : lignes 73-75 equivalent à : 
  // if (firstname !== undefined) {user.firstname = firstname;}
  // if (lastname !== undefined) {user.lastname = lastname;}
  // if (email !== undefined) {user.email = email;}

  // N.B : lignes 73-75 equivalent aussi à :
  // user.firstname = firstname || user.firstname;
  // user.lastname = lastname || user.lastname;
  // user.email = email || user.email;

  response.status(201).send("User successfully updated.");
  console.log(user);
});

serverExpress.delete("/users/:userId", (request, response) => {
  // je récupère les données envoyées
  const userId = request.params["userId"];

  // je vérifie si j'ai bien user
  const user = existingUsers.find((user) => {
    return user.id == userId
  });
 
  //filter manipule le tableau de user et me renvoie un nouveau tableau
  existingUsers = existingUsers.filter((user) => {
    return user.id != userId
  });

  //si user n'existe alors je renvoie une erreur
  if(!user) {
    response.status(404).send("User not found. Unable to proceed.");
  } else {
    response.send(`User ${request.params["userId"]} deleted.`);
  } 
});

serverExpress.listen(port, (err) => {
  if (err) {
    throw new Error("Something terrible happened...");
  }
  console.log(`Listening to all requests on ${port}`);
});
