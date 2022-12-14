const { Router} = require ("express");
const SessionsController = require("../controllers/SessionsController");

const sessionsController = new SessionsController(); //instanciando na constante a classe

const SessionsRoutes = Router();

SessionsRoutes.post("/", sessionsController.create);

module.exports = SessionsRoutes;

