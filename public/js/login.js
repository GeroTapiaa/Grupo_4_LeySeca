// funcion para solamente llamar una sola vez al "id" de un elemento.
const $ = (element) => document.getElementById(element);



/*******/

// EXPRESIONES REGULARES
const exRegs = {
    exRegPass:
        /^(?=.*)(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
    exRegUser: /^[a-zA-Z0-9\_\-]{4,16}$/,

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


// validaciones de formulario

// USER

const validations = (e) => {
    switch (e.target.name) {
        case "user":
            if (
                !exRegs.exRegUser.test(e.target.value.trim()) &
                (e.target.value.length >= 2)
            ) {
                errorStyle("user", "is-valid", "is-invalid");
                msgError(
                    "errorUser",
                    "El nombre es obligatorio y debe contener al menos dos caracteres alfabéticos"
                );

            } else {
                ok("user", "is-valid");
                cleanError("errorUser");
            }
            console.log(e.target.value);

            break;
        case 'password':
            if (
                exRegs.exRegPass.test(e.target.value) &&
                (e.target.value.length >= 6)
            ) {
                ok("password", "is-valid");
                cleanError("errorPassword");
            } else {
                errorStyle("password", "is-valid", "is-invalid");
                msgError(
                    "errorPassword",
                    "La contraseña es obligatoria, debe contener números, una letra mayúscula, y un caracter especial"
                );
            }


            break;
    }

}

// /********/

// SELECCIONA A TODOS LOS INPUTS DEL FORMUALRIO Y LES APLICA EL EVENTO KEYUP Y BLUR
const inputs = document.querySelectorAll("#login input");

inputs.forEach((input) => {
    input.addEventListener("keyup", validations);
    input.addEventListener("blur", validations);
});

/***********************/





//hace visible el password
$("eye-password").addEventListener("click", ({ target }) => {
    if (target.localName === "i") {
        target.classList.toggle("fa-eye");
        $("password").type = $("password").type === "text" ? "password" : "text";
    }
}); /********/



/********/

// ENVIA EL FORMULARIO SOLO SI ESTA COMPLETO


$('login').addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = [user, password];
    console.log(inputs);

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].value.length == 0) {
            inputs[i].classList.contains('is-invalid')
            inputs[i].classList.add("is-invalid");
            $('msgError').innerText = "Debes completar bien los campos requeridos.";
        } else {
            inputs[i].classList.remove("is-invalid");

            $('login').submit()

        }
    }
})

/********/
