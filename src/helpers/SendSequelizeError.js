module.exports = (error) => { 
    if(!error.errors){ 
        return error.message || "Hubo un error!Por favor, Comuníquese con el administrador" 
        
    }

    let errorsObject = {} 
    
    error.errors.forEach(error => {
        errorsObject = { 
            ...errorsObject, 
            [error.path] : error.message 
        }
    });

    return errorsObject; 
}