const express = require("express");
const app = express();
const path = require("path");
const port = 3030
app.use(express.static("public"))




app.listen(3030 , () => console.log("Servidor corriendo en" + port));
