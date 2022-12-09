require("express-async-errors"); // npm install express-async-errors --save
const migrationsRun = require("./database/sqlite/migrations");
const express = require("express");

const AppError = require("./utils/AppError");
const routes = require("./routes");


migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
if(error instanceof AppError) { //error no lado do cliente
    return response.status(error.statusCode).json({
        status: "error",
        message: error.message
    });
}
console.log(error);
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Serve is runing on port ${PORT}, acessa http://localhost:3333/`));