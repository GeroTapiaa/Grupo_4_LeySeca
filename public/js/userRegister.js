// funcion para solamente llamar una sola vez al "id" de un elemento.
const $ = (element) => document.getElementById(element);

// Anula la el envio del formulario hasta verificar errores de datos en los campos
$("form-register").addEventListener("submit", function (e) {
  e.preventDefault();
});
/*******/

// EXPRESIONES REGULARES
const exRegs = {
  exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
  exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
  exRegPass:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
  exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /[0-9]/,
  exRegEsp: /[$@$!%*?&]/,
  exRegMin: /.{6,}/,
  exRegMax: /.{8}/,
  exRegUser: /^[a-zA-Z0-9\_\-]{4,16}$/,
  exRegDate: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
};
/********/
// FUNCION PARA COLOCAR MENSAJE DE ERROR Y AGREGAR CLASE DE ESTILO
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

// // NAME
const validations = (e) => {
  switch (e.target.name) {
    case "name":
      if (
        exRegs.exRegAlfa.test(e.target.value.trim()) &
        (e.target.value.length >= 2)
      ) {
        ok("name", "is-valid");
        cleanError("errorName");
      } else {
        errorStyle("name", "is-valid", "is-invalid");
        msgError(
          "errorName",
          "El nombre es obligatorio y debe contener al menos dos caracteres alfabéticos"
        );
      }
      break;

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
          "El apellido es obligatorio y debe contener al menos 2 caracteres alfabéticos"
        );
      }

      break;
    case "user":
      if (
        exRegs.exRegUser.test(e.target.value.trim()) &
        (e.target.value.length >= 5)
      ) {
        ok("user", "is-valid");
        cleanError("errorUser");
      } else {
        errorStyle("user", "is-valid", "is-invalid");
        msgError(
          "errorUser",
          "El usuario es obligatorio y debe contener al menos 5 caracteres alfanuméricos"
        );
      }

      break;

    default:
      break;
  }
};
// /********/
const inputs = document.querySelectorAll("#form-register input");

inputs.forEach((input) => {
  input.addEventListener("keyup", validations);
  input.addEventListener("blur", validations);
});

/****************************************************************************************** */

/********/

//hace visible el password
$("eye-password").addEventListener("click", ({ target }) => {
  if (target.localName === "i") {
    target.classList.toggle("fa-eye");
    $("password").type = $("password").type === "text" ? "password" : "text";
  }
}); /********/

//hace visible el password de confirmación.

$("eye-password2").addEventListener("click", ({ target }) => {
  if (target.localName === "i") {
    target.classList.toggle("fa-eye");
    $("confirmPassword").type =
      $("confirmPassword").type === "text" ? "password" : "text";
  }
});
/********/

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
