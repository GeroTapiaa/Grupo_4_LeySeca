




/*Ventana emergente para validar edad 
cuando entras a la pagina 
-si está logueado que no aparezca la ventana emergente
-si no esta logueado se muestra la ventana emergente con las opciones X
    -si : guardar la opcion que selecciono y redireccionar al home X
    -no : redireccionar a youTube X
*/

/*se declara una funcion anonima para usarla una unica vez*/

(function () {

    // const isLogged = sessionStorage.getItem('isLogged') === 'true';


    /*El valor que trae sessionStorage es true*/
    const isValidAge = sessionStorage.getItem('isValidAge') === 'true';


    /* si isValidAge es true, le aplica al modal la clase 'modal-none-ok' que quita al modal*/
    if (!isValidAge) {

        modal.classList.remove('modal-none-ok')
        modal.classList.add('modal-ok')

    }

})()

/* el atributo 'onclick' del archivo ejs le da el valor de true o false a la funcion 'ageValidation'
    en el caso que la funcion ageValidation devuelva false va a redirigir al usuario a un video de YouTube
    de lo contrario, remueve al modal y le aplica la clase  'modal-none-ok' que remueve al modal.

 */
function ageValidation(isValid) {
    console.log(isValid);
    if (!isValid)
        return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank').focus()


    /*se guarda un valor en el sessionStorage */

    sessionStorage.setItem('isValidAge', true)

    modal.classList.remove('modal-ok')
    modal.classList.add('modal-none-ok')
    /* redirecciona al usuario al home independientemente de la vista en donde se inicie la pagi*/
    window.location.href = '/'
}




