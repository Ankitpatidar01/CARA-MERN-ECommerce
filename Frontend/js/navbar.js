const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');

        const cartstyle = document.getElementById("cart-count-mobile");
        if (cartstyle) {
            cartstyle.style.display = "none"; 
        }
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');

        const cartstyle = document.getElementById("cart-count-mobile");
        if (cartstyle) {
            cartstyle.style.display = "inline-block"; 
        }
    });
}

// ===============================
// USER MENU
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

const userName = document.getElementById("user-name");
const userBtn = document.getElementById("user-btn");
const userDropdown = document.getElementById("user-dropdown");
const logoutBtn = document.getElementById("logout-btn");

if (userName) {

    if (user) {
        userName.innerText = user.username;
    }
    else {
        userName.innerText = "Login";
    }

}

if (userBtn) {

    userBtn.addEventListener("click", function(e) {

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        e.preventDefault();

        if(window.innerWidth <= 799){
            userDropdown.classList.toggle("show");
        }
        else{
            userDropdown.classList.toggle("show");
        }

    });

}

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    });

}

window.addEventListener("click", function(e) {

    if (!e.target.closest("#user-menu")) {

        if (userDropdown) {
            userDropdown.classList.remove("show");
        }

    }

});