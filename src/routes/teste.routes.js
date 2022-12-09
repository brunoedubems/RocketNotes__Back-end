const { Router, request, response } = require ("express");

const testRoutes = Router();


testRoutes.get("/", (request, response) => {

    response.send("Isso aqui é um teste")
})

testRoutes.get("/24", (request, response) => {

    response.send("hummmm 24 é?")
})

module.exports = testRoutes;