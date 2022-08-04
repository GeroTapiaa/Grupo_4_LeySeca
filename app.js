const express = require('express');
const app = express();
const path = require('path');
const port = 3030
app.use(express.static('public'))

app.get('/productDetail', (req, res) => res.sendFile(path.join(__dirname,'views', 'productDetail.html')));




app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/terminos', (req, res) => res.sendFile(path.join(__dirname, 'views', 'ter-condiciones.html')));

app.listen(port, () => console.log('Server Up in http://localhost:' + port));
