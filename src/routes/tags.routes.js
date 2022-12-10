const { Router } = require ("express");

const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router();


const tagsController = new TagsController(); // INSTANCIANDO A CLASSE(MODELO)

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes; // exportando para quem quiser usar













/*
//Os parametros são "ObrigatorioSSS" para a roda
app.get("/message/:id/:user", (request, response) => {
const { id, user } = request.params;

response.send(`
Mensagem ID: ${id}
Para o Usuário: ${user}.`)
});


//Os valores são "opcional" para a roda      
    // ? é query parament.
    // & mais de um paramentro.
       // /users? page=1 & limit=10
app.get("/users", (request, response) => {
    const { page, limit } = request.query;
    response.send(` Pagina: ${page}. Mostrar: ${limit}.`)
});
*/











