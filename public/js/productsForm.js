console.log('create');

// funcion para solamente llamar una sola vez al "id" de un elemento.
const $ = (element) => document.getElementById(element);


// EXPRESIONES REGULARES
const exRegs = {
  exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
  exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /^[0-9]+$/,
  exRegMin: /.{6,}/,
  exRegMax: /.{8}/,
  exRegUser: /^[a-zA-Z0-9\_\-]{4,100}$/,
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

// validaciones de formulario de productos

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
      checkFields()

      break;



    // PRICE

    case "price":
      if (exRegs.exRegNum.test(e.target.value) & (e.target.value.length > 1)) {
        ok("price", "is-valid");
        cleanError("errorPrice");
      } else {
        errorStyle("price", "is-valid", "is-invalid");
        msgError(
          "errorPrice",
          "El precio es obigatorio y solo debe contener números"
        );
      }
      console.log(e.target.value);

      break;

      checkFields()


    case "discount":
      if (!exRegs.exRegNum.test(e.target.value)) {
        errorStyle("discount", "is-valid", "is-invalid");
        msgError(
          "errorDiscount",
          "El descuento solo debe contener números"
        );

      } else {
        ok("discount", "is-valid");
        cleanError("errorDiscount");

      }
      console.log(e.target.value);


      break;
  }
};

//  DESCRIPTION

$("description").addEventListener("keyup", function ({ target }) {
  if (exRegs.exRegUser.test(target.value.trim()) & (target.value.length > 10)) {
    ok("description", "is-valid");
    cleanError("errorDescription");
  } else {
    errorStyle("description", "is-valid", "is-invalid");
    msgError(
      "errorDescription",
      "La descripción es obligatoria y debe contener un mínimo de 10 caracteres"
    );
  }
  console.log(target.value);
  checkFields()


});

// CATEGORY

$("category").addEventListener("click", function (e) {
  if (!e.target.value) {
    errorStyle("category", "is-valid", "is-invalid");
    msgError("errorCategory", "Debes elegir una categoría");
  } else if (e.target.value) {
    ok("category", "is-valid");
    cleanError("errorCategory");
  }
  console.log(e.target.value);
  checkFields()


});
// /********/

// IMAGES

$("images").addEventListener("change", function () {
  var filePath = this.value;
  var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
  if (!allowedExtensions.exec(filePath)) {
    errorStyle("images", "is-valid", "is-invalid");
    msgError(
      "errorImages",
      "El formato de la imagen no es válido,solo : jpeg/.jpg/.png/.gif/.webp"
    );

  } else {
    ok("images", "is-valid");
    cleanError("errorImages");

  }
  console.log(this.value);
  checkFields()


});


// SE SELECCIONAN TODOS LOS INPUTS PARA RECORRERLOS Y ASIGNARLES UN MISMO EVENTO
const inputs = document.querySelectorAll("#form-create input");

inputs.forEach((input) => {
  input.addEventListener("keyup", validations);
  input.addEventListener("blur", validations);
});

/*********************** */

const elements = $("form-create").elements;

$("form-create").addEventListener("submit", function (e) {
  e.preventDefault();
  let error = false;

  const elements = this.elements;
  for (let i = 0; i < elements.length - 2; i++) {

    if (!elements[i].value.trim() || elements[i].classList.contains('is-invalid')) {
      elements[i].classList.add('is-invalid')
      $('msgError').innerText = 'Hay campos con errores o están vacíos';
      error = true;
    }
  }


  !error && this.submit()
  console.log(error);


});