console.log('anda');
window.addEventListener("scroll", function () {
    var nav = document.querySelector("nav");
    nav.classList.toggle("scroll", window.scrollY > 100);
});


const modal = document.getElementById('modal');
const click = document.getElementById('confirm')

click.addEventListener('click', function (e) {
    e.preventDefault()
    modal.classList.add('modal-none')
})