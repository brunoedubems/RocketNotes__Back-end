const { Router } = require ("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);


const userController = new UserController(); // INSTANCIANDO A CLASSE(MODELO)
const userAvatarController = new UserAvatarController(); // INSTANCIANDO A CLASSE(MODELO)

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated , userController.update);
userRoutes.patch("/avatar", ensureAuthenticated , upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes; // exportando para quem quiser usar













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











