const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
    window.location.href = "login.html";
}

fetch("http://localhost:5050/products")
    .then(res => res.json())
    .then(products => {

        document.getElementById("totalProducts").textContent =
            products.length;

    })
    .catch(error => {
        console.log(error);
    });

const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});


