// funcion para solamente llamar una sola vez al "id" de un elemento.
const $ = (element) => document.getElementById(element);



/*******/

// EXPRESIONES REGULARES
const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegUser: /^[a-zA-Z0-9\_\-]{4,16}$/,
    exRegAddress: /^([a-zA-Z0-9_-]){1,50}$/
};
/********/
// FUNCION PARA AGREGAR CLASE DE ESTILO
const ok = (target, style) => {
    $(target).classList.add(style);
};

// /********/
// FUNCION DE MENSAJE DE ERROR
const msgError = (element, message) => {
    $(element).innerText = message;
};
// /********/

// FUNCION PARA LIMPIAR EL MENSAJE DE ERROR DE UN CAMPO VALIDO
const cleanError = (elemet) => {
    $(elemet).innerText = null;
};

// /********/
//  FUNCION PARA REMOVER LA CLASE INVALIDA Y COLOCAR LA CLASE CON ESTILO DE VALIDO
const errorStyle = (target, remove, add) => {
    $(target).classList.remove(remove);
    $(target).classList.add(add);
};
// /********/


const verifieldUser = async (user) => {
    try {
        let response = await fetch("/API/users/verify-user", {
            method: "POST",
            body: JSON.stringify({
                user: user,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        let result = await response.json();

        console.log(result);

        return result.verified;
    } catch (error) {
        console.error;
    }
};

// /********/



// validaciones de formulario

// // NAME
const validations = (e) => {

    switch (e.target.name) {
        case "firstName":
            if (
                exRegs.exRegAlfa.test(e.target.value.trim()) &
                (e.target.value.length >= 2)
            ) {
                ok("firstName", "is-valid");
                cleanError("errorName");
            } else {
                errorStyle("firstName", "is-valid", "is-invalid");
                msgError(
                    "errorName",
                    "El nombre debe contener al menos 2 caracteres alfabéticos"
                );
            }
            break;

        // SURNAME

        case "surname":
            if (
                exRegs.exRegAlfa.test(e.target.value.trim()) &
                (e.target.value.length >= 2)
            ) {
                ok("surname", "is-valid");
                cleanError("errorSurname");
            } else {
                errorStyle("surname", "is-valid", "is-invalid");
                msgError(
                    "errorSurname",
                    "El apellido debe contener al menos 2 caracteres alfabéticos"
                );
            }

            break;

        // ADDRESS

        case "address":
            if (
                exRegs.exRegAddress.test(e.target.value.replace(/ /g, '')) &&
                (e.target.value.length >= 5)
            ) {
                ok("address", "is-valid");
                cleanError("errorAddress");
            } else {
                errorStyle("address", "is-valid", "is-invalid");
                msgError(
                    "errorAddress",
                    "La direccion es obligatoria"
                );
            }
            console.log(e.target.value);

            break;


    }
};

// USER


$('user').addEventListener("keyup", async function () {
    switch (true) {

        case !exRegs.exRegUser.test(this.value):
            errorStyle("user", "is-valid", "is-invalid");
            msgError(
                "errorUser",
                "El usuario debe contener al menos 5 caracteres alfanuméricos"
            );
            break;
        case await verifieldUser(this.value):
            errorStyle("user", "is-valid", "is-invalid");
            msgError(
                "errorUser",
                "El usuario ya se encuentra registrado"
            );
            break;

        default:
            ok("user", "is-valid");
            cleanError("errorUser");
            break;
    }
});



// SELECCIONA A TODOS LOS INPUTS DEL FORMUALRIO Y LES APLICA EL EVENTO KEYUP Y BLUR
const inputs = document.querySelectorAll("#profile-edit input");

inputs.forEach((input) => {
    input.addEventListener("keyup", validations);
    input.addEventListener("blur", validations);
});

/***********************/


// vista previa de la imagen de perfil
let preview = (event) => {
    let read_img = new FileReader();
    let id_img = document.getElementById("img-photo");

    read_img.onload = () => {
        if (read_img.readyState == 2) {
            id_img.src = read_img.result;
        }
    };
    read_img.readAsDataURL(event.target.files[0]);
};

/********/

// ENVIA EL FORMULARIO SOLO SI ESTA COMPLETO
$('profile-edit').addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = [user, address, surname, firstName];
    console.log(inputs);

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].value.length == 0) {
            inputs[i].classList.contains('is-invalid')
            inputs[i].classList.add("is-invalid");
            $('msgError').innerText = "Debes completar bien los campos requeridos.";
        } else {
            inputs[i].classList.remove("is-invalid");

            $('profile-edit').submit()

        }
    }
})

/********/
