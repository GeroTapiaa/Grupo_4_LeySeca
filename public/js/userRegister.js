// funcion para solamente llamar una sola vez al "id" de un elemento.
const $ = (element) => document.getElementById(element);



/*******/

// EXPRESIONES REGULARES
const exRegs = {
  exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
  exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
  exRegPass:
    /^(?=.*)(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
  exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /^[0-9]+$/,

  exRegEsp: /[$@$!%*?&]/,
  exRegMin: /.{6,}/,
  exRegMax: /.{8}/,
  exRegUser: /^[a-zA-Z0-9\_\-]{4,16}$/,
  exRegDate: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
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


// FUNCION PARA VERIFICAR EMAIL

const verifieldEmail = async (email) => {
  try {
    let response = await fetch("/API/users/verify-email", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();



    return result.verified;
  } catch (error) {
    console.error;
  }
};
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



    return result.verified;
  } catch (error) {
    console.error;
  }
};

// /********/

// ALMACEN MOMENT
const dateNow = moment();
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
      console.log(e.target.value);

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
          "El apellido es obligatorio y debe contener al menos 2 caracteres alfabéticos"
        );
      }
      console.log(e.target.value);


      break;

    // ADDRESS

    case "address":
      if (
        exRegs.exRegAddress.test(e.target.value) &&
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

    // DATE, VARIABLE 'dateNow' LINEA 78

    case 'date':
      if (dateNow.diff(moment(e.target.value), 'years') < 18) {
        errorStyle("date", "is-valid", "is-invalid");
        msgError(
          "errorDate",
          "Debes ser mayor de edad"
        );
      } else {
        ok("date", "is-valid");
        cleanError("errorDate");
      }
      console.log(e.target.value);

      break;
    // PASSWORD, FUNCION 'validatePassword' lINEA 260. 
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
      if (e.target.value.length >= 6) {
        validatePassword()

      }
      console.log(e.target.value);


      break;


    //  CONFIRM PASSWORD, FUNCION 'validatePassword' lINEA 260. 

    case 'confirmPassword':
      if (e.target.value.length >= 6) {
        validatePassword()

      } else {
        errorStyle("confirmPassword", "is-valid", "is-invalid");
        msgError(
          "errorConfirmPassword",
          "Debes confirmar la contraseña "
        );
      }
      console.log(e.target.value);

      break;


    default:
      break;
  }
};

// EMAIL, FUNCION 'verifieldEmail' LINEA 53.

$('email').addEventListener("keyup", async function () {
  switch (true) {
    case !this.value:
      errorStyle("email", "is-valid", "is-invalid");
      msgError(
        "errorEmail",
        "El mail es obligatorio")
      break;
    case !exRegs.exRegEmail.test(this.value):
      errorStyle("email", "is-valid", "is-invalid");
      msgError(
        "errorEmail",
        "El mail es iválido"
      );
      break;
    case await verifieldEmail(this.value):
      errorStyle("email", "is-valid", "is-invalid");
      msgError(
        "errorEmail",
        "El mail ya se encuentra registrado"
      );
      break;

    default:
      ok("email", "is-valid");
      cleanError("errorEmail");
      break;
  }
  console.log(this.value);
});

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
  console.log(this.value);
});
// TERMINOS Y CONDICIONES

// $('terminos').addEventListener('click', ({ target }) => {

//   if (target.checked === false) {
//     msgError(
//       "errorTerms",
//       "Debes aceptar los términos y condiciones"
//     );
//   } else {
//     cleanError("errorTerms");
//   }

// })

// FUNCION PARA PROBAR SI LAS CONTRASEÑAS COINCIDEN 
const validatePassword = () => {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  if (password.value !== confirmPassword.value) {
    errorStyle("confirmPassword", "is-valid", "is-invalid");
    msgError(
      "errorConfirmPassword",
      "Las contraseñas no coinciden "
    );


  } else {
    ok("confirmPassword", "is-valid");
    cleanError("errorConfirmPassword");




  }
  console.log(password.value);
}

// /********/

// SELECCIONA A TODOS LOS INPUTS DEL FORMUALRIO Y LES APLICA EL EVENTO KEYUP Y BLUR
const inputs = document.querySelectorAll("#form-register input");

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

// ENVIA EL FORMULARIO SOLO SI ESTA COMPLETO
$('terminos').addEventListener("click", function (e) {

  cleanError("errorTerms");

})


$("form-register").addEventListener("submit", function (e) {

  e.preventDefault();
  let error = false;

  if (!$('terminos').checked) {
    error = true;
    $('errorTerms').innerText = "Debes aceptar las bases y condiciones";
    $('terminos').classList.add('is-invalid')
  }


  const elements = this.elements;
  for (let i = 0; i < elements.length - 2; i++) {

    if (!elements[i].value.trim() || elements[i].classList.contains('is-invalid')) {
      elements[i].classList.add('is-invalid')
      $('msgError').innerText = 'Hay campos con errores o están vacíos';
      error = true;
    }

  }
  $('msgError').innerText = null;
  error = true;


  !error && this.submit()


});





/********/