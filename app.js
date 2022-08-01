const express = require("express");
const app = express();
const path = require("path");
const port = 3030
app.use(express.static("public"))

app.get('/productDetail.html', (req, res) => res.sendFile(path.join(__dirname,'views', 'productDetail.html')));


app.listen(3030 , () => console.log("Servidor corriendo en" + port));
