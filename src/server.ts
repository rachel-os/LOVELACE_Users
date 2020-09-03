import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/userRoutes';

const serverExpress = express();
serverExpress.use(bodyParser.json());
serverExpress.use(bodyParser.urlencoded({extended: true}));
serverExpress.set('view engine', 'ejs');

serverExpress.use("/users", usersRoutes);

serverExpress.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

const listeningServer = serverExpress.listen(8000, () => {
  console.log("Listening to all requests on 8000...");
});

export = { listeningServer };