const { hash, compare} = require("bcryptjs");
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

class UserController{
      async create (request, response){
       const {name, email, password} = request.body;

       const database = await sqliteConnection();
      const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
      if(checkUserExists){
            throw new AppError('Esse e-mail já está em uso');
      }                       
      const hashedPassword = await hash(password, 8);

      //cadastrando usuario
      await database.run(
         "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
         [name, email, hashedPassword]
         );
      return response.status(201).json();

}


async update (request, response){
const {name, email, password, old_password} = request.body;
const { id } = request.params;

const database = await sqliteConnection(); //conexão com database
const user = await database.get("SELECT * FROM users WHERE id = ( ? )", [id]); //seleciona os dados do id requerido no banco de dados,
      //verifica sem existe o usuario no banco de dados
      if(!user){
            throw new AppError("Usuário não encontrado");
      }

      //seleciona o email do banco de dados
      const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = ( ? )", [email]);
      
      //verifica se o email já existe na base antes da ALTERAÇÃO, e se pertence ao solicitante()
      if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este Email já em uso.");
      }
      //atribui novos valores para requisição(name) para o banco de dados(user)
      user.name = name ?? user.name;
      user.email = email ?? user.email;

      if(password && !old_password){
            throw new AppError("Você precisa informar a senha anterior para trocar a senha")
      }

      if(password && old_password){
          const checkOldPassword = await compare(old_password,user.password);
            
            if(!checkOldPassword){
                  throw new AppError("A senha antiga nao confere")
            }
            user.password = await hash(password,8)
      }

      //faz a atualização no banco de dados com os dados já alterados 
      await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
      );
      return response.status(200).json();

 }
}

module.exports = UserController;






/*
const AppError = require('../utils/AppError');

class UserController{
 create (request, response){
      const {name, email, password} = request.body;
      
      if(!name){
            throw new AppError("O nome é obrigatório");
      }
      
      response.status(201).json({name, email, password});
}

}

module.exports = UserController;

*/ 













/*
//A classe é utilizada para colocar varias funções
// cada controle PODE TER até 5 métodos
// controller → processamento das requisições(execultar o que o usuario pediu)

class UserController{
/* 
funções/métodos
index        →   GET para listar Vários  registros
show         →   GET para exibir um registro especifico.
create       →   POST para criar um registro.
update       →   PUT para atualizar um registro.
delete       →   DELETE para remover um registro.

*/