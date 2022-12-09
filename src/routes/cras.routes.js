const { Router} = require("express");

const crasRoutes = Router();

crasRoutes.get("/", (req, res) => {
    res.send("O Centro de Referência de Assistência Social do Brasil é uma unidade responsável pela oferta de serviços de proteção básica do Sistema Único de Assistência Social, nas áreas de vulnerabilidade e risco social.")
})
crasRoutes.get("/tocandira", (req, res) => {
    res.send("UMA MERDA ")
})
crasRoutes.post("/tocandira", (req, res) => {
    res.send("RECEBEMOS O SEU RMA")
})

module.exports = crasRoutes;