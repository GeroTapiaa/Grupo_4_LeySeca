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


$('user').addEventListener("keyup", async function () {
    switch (true) {
        case !this.value:
            errorStyle("user", "is-valid", "is-invalid");
            msgError(
                "errorUser",
                "El usuario es obligatorio")
            break;
        case !exRegs.exRegUser.test(this.value):
            errorStyle("user", "is-valid", "is-invalid");
            msgError(
                "errorUser",
                "El usuario debe contener al menos 5 caracteres alfanuméricos"
            );
            break;


        default:
            ok("user", "is-valid");
            cleanError("errorUser");
            break;
    }
});

// PASSWORD

$("password").addEventListener("keyup", async function ({ target }) {
    switch (true) {
        case !this.value.trim():
            errorStyle("password", "is-valid", "is-invalid");
            msgError(
                "errorPassword",
                "Debes ingresar la contraseña"
            );
        default:
            ok("password", "is-valid");
            cleanError("errorPassword");
            break;
    }
});

//hace visible el password
$("eye-password").addEventListener("click", ({ target }) => {
    if (target.localName === "i") {
        target.classList.toggle("fa-eye");
        $("password").type = $("password").type === "text" ? "password" : "text";
    }
}); /********/



/********/

// ENVIA EL FORMULARIO SOLO SI ESTA COMPLETO

$("profile-edit").addEventListener("submit", function ({ target }) {

    e.preventDefault();
    let error = false;

    const elements = this.elements;
    for (let i = 0; i < elements.length - 1; i++) {
        if (
            !elements[i].value.trim() ||
            elements[i].classList.contains("is-invalid")
        ) {
            elements[i].classList.add("is-invalid");
            $("msgError").innerText = "¡Completá los campos correctamente!";
            error = true;
        }
    }

    !error && this.submit()
});

/********/
