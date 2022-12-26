require("dotenv/config")
require("express-async-errors"); // npm install express-async-errors --save

const migrationsRun = require("./database/sqlite/migrations");
const express = require("express");

const AppError = require("./utils/AppError");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");
const cors = require("cors");


migrationsRun();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
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


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Serve is runing on port ${PORT}, acessa http://localhost:3333/`));