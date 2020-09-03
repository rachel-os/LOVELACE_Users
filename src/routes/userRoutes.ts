import { Request, Response, Router } from 'express';
import userController from '../controllers/userController';
const router = Router();

router.get("/:userId", (request: Request, response: Response) => {
  // http://localhost:3000/users/1

  const userId = request.params["userId"];
  console.log(`Details about user ${request.params["userId"]}  are requested.`);

  //TO DO : insérer condition pour check que userId soit toujours un nb
  const user = userController.findUser(userId);

  if(user === undefined){
    response.status(404).send("Utilisateur non trouvé");
  } else {
    // res.status(200).send(user);
    response.render('user.ejs', { user: user });
  }
});

router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Users' list");
});

router.post("/", (request: Request, response: Response) => {
  const firstname = request.body["firstname"];
  const lastname = request.body["lastname"];
  const email = request.body["email"];

  console.log(request.body);
  if(firstname == undefined || lastname == undefined){
    response.status(400).send("Please fill in the required field(s).");
    return;
  }

  userController.createUser(firstname, lastname, email);

  response.status(201).send("Utilisateur créé");
});

router.patch("/:userId", (request: Request, response: Response) => {
  const firstname = request.body["firstname"];
  const lastname = request.body["lastname"];
  const email = request.body["email"];

  const userId = request.params["userId"];

  const user = userController.findUser(userId);

  //si le user n'existe pas alors je renvoie une erreur
  if(!user) { response.status(404).send("User not found") }

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

router.delete("/:userId", (request: Request, response: Response) => {
  // je récupère les données envoyées
  const userId = request.params["userId"];

   // je vérifie si j'ai bien user
  const user = userController.findUser(userId);
  if(!user) { 
    response.status(404).send("User not found. Unable to proceed.") 
  }

  userController.deleteUser(user);
  response.status(200).send("Utilisateur Supprimé")
});

export = router;