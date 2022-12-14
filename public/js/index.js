




/*Ventana emergente para validar edad 
cuando entras a la pagina 
-si está logueado que no aparezca la ventana emergente
-si no esta logueado se muestra la ventana emergente con las opciones X
    -si : guardar la opcion que selecciono y redireccionar al home X
    -no : redireccionar a youTube X
*/

(function () {
    console.log(document.cookie);
    const isLogged = localStorage.getItem('isLogged') === 'true';
    const isValidAge = localStorage.getItem('isValidAge') === 'true';


    if (!isLogged && !isValidAge) {


        modal.classList.remove('modal-none')
        modal.classList.add('modal')

    }

})()

function ageValidation(isValid) {
    if (!isValid)
        return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank').focus()

    localStorage.setItem('isValidAge', true)
    modal.classList.remove('modal')
    modal.classList.add('modal-none')

    window.location.href = '/'
}




