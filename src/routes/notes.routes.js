const { Router } = require ("express");

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router();


const notesController = new NotesController(); // INSTANCIANDO A CLASSE(MODELO)

notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);


module.exports = notesRoutes; // exportando para quem quiser usar













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











