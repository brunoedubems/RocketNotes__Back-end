const { Router } = require ("express");

const usersRouter = require("./users.routes");
const testRouter = require("./teste.routes");
const crasRouter = require("./cras.routes");

const routes = Router();



routes.use("/users",usersRouter);
routes.use("/teste",testRouter);
routes.use("/cras",crasRouter);


module.exports = routes;