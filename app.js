const express = require("express");
const app = express();
const path = require("path");
const port = 3030
app.use(express.static("public"))



app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'views', 'register.html' )));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html' )));
app.get('/Ter-Condiciones', (req,res) => res.sendFile(path.join(__dirname, 'views', 'Ter-condiciones.html' )));
app.listen(3030 , () => console.log("Servidor corriendo en" + port));
