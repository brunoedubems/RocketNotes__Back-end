const sqlite3 = require("sqlite3"); // drive de conecção (mongoose)
const sqlite = require("sqlite"); // para conectar
const path = require("path"); // resolve o endereços (caminhos do projeto)


async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname,"..","database.db"), //cria o banco de dados caso nao esteja criado
        driver: sqlite3.Database
    });
    return database;
}

module.exports = sqliteConnection;