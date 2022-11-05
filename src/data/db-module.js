const fs = require('fs');
const path = require('path');


const loadUsers = () => {

    return JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'))
}

const storeUsers = (users) => {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 3), 'utf8');
}

const loadProducts = () => {

    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'))
}
const saveProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 3), 'utf8');
}
const eliminarImg = (ruta) =>{
    fs.existsSync(path.resolve(__dirname,"...","public" + ruta)) && fs.unlinkSync(path.resolve(__dirname, "...","public" + ruta))
}

const eliminarAvatarToUser = (archivo) => {
    fs.existsSync(path.resolve(__dirname, "../../public/images/users/" + archivo)) && fs.unlinkSync(path.resolve(__dirname, "../../public/images/users/" + archivo))
}
module.exports = {
    loadUsers,
    storeUsers,
    loadProducts,
    saveProducts,
    eliminarImg,
    eliminarAvatarToUser
}