const express = require('express');
const app = express();
const path = require('path');
const port = 3030
app.use(express.static('public'))




app.listen(port, () => console.log('Server Up in http://localhost:' + port));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));