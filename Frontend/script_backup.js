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
let discount = 0;
let finalTotal = 0;

// This create a reusable header for authentication requests
const token = localStorage.getItem("accessToken");

const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
};

// update cart counter

function updateCartCount(){
    fetch("http://localhost:5050/carts")
    .then(res => res.json())
    .then(cart => {
        let count = 0;

        cart.forEach(item => {
            count += item.quantity;
        });

        document.getElementById("cart-count").innerText = count;
        document.getElementById("cart-count-mobile").innerText = count;

    });

}

function renderProducts(container, products) {
    let html = "";

    products.forEach(product => {
        html += `
        <div class="pro">
            <img src="${product.image}" alt="">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>₹${product.price}</h4>
            </div>
            <a class="add-to-cart" data-id="${product._id}">
                <i class="fal fa-shopping-cart cart"></i>
            </a>
        </div>
        `;
    });

    container.innerHTML = html;
}


fetch("http://localhost:5050/products")
.then(res => res.json())
.then(products => {

    console.log(products);

    const featured = products.filter(
        p => p.category === "featured"
    );

    const newArrival = products.filter(
        p => p.category === "newArrival"
    );

    const featuredContainer = document.querySelector(".featured");
    const newArrivalContainer = document.querySelector(".newArrival");

    if(featuredContainer){
        renderProducts(featuredContainer, featured);
    }

    if(newArrivalContainer){
        renderProducts(newArrivalContainer, newArrival);
    }

        const container = document.querySelector(".pro-container");

    let html = "";

    products.forEach(product => {
        html += `
        <div class="pro">
            <img src="${product.image}" alt="">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>₹${product.price}</h4>
            </div>
            <a class="add-to-cart" data-id="${product._id}">
                <i class="fal fa-shopping-cart cart"></i>
            </a>
        </div>
        `;
    });

    container.innerHTML = html;

})
.catch(err => console.error(err));

document.addEventListener("click", function(e){

    const button = e.target.closest(".add-to-cart");

    if(button){

        const productId = button.dataset.id;

        fetch("http://localhost:5050/carts",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                productId:productId
            })
        })
        .then(res => res.json())
        .then(data => {
               updateCartCount();
            alert("Product added to cart");
        })
        .catch(err => console.error(err));

    }

});


if (window.location.pathname.includes("cart.html")) {

fetch("http://localhost:5050/carts")
.then(res => res.json())
.then(cart => {

const table = document.getElementById("cart-items");

if(!table) return;

table.innerHTML = "";

let total = 0;

cart.forEach(item => {

if(!item.productId) return;

const product = item.productId;

const subtotal = product.price * item.quantity;

total += subtotal;

table.innerHTML += `
<tr>

<td>
<a href="#" class="remove-item" data-id="${item._id}">
<i class="far fa-times-circle"></i>
</a>
</td>

<td>
<img src="${product.image}" width="60">
</td>

<td>
${product.name}
</td>

<td>
$${product.price}
</td>

<td>
<input type="number" class="update-qty" data-id="${item._id}" value="${item.quantity}">
</td>

<td>
$${subtotal}
</td>

</tr>
`;

});

finalTotal = total

const subtotalElement = document.getElementById("cart-subtotal");
const totalElement = document.getElementById("cart-total");

if(subtotalElement) subtotalElement.innerText = "$" + total;
if(totalElement) totalElement.innerText = "$" + total;

})
.catch(err => console.error(err));

}


document.addEventListener('click' , (e)=>{
    const removeBtn = e.target.closest(".remove-item");

    if(removeBtn){ 
        const id = removeBtn.dataset.id;

        fetch(`http://localhost:5050/carts/${id}` , {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            location.reload();
               updateCartCount();
        });
    }
});


// update 

function updateCartTotal(){

const rows = document.querySelectorAll("#cart-items tr");

let subtotal = 0;

rows.forEach(row => {

const subtotalText = row.children[5].innerText;

const value = parseFloat(subtotalText.replace("$",""));

subtotal += value;

});

finalTotal = subtotal - discount;

document.getElementById("cart-subtotal").innerText = "$" + subtotal;
document.getElementById("cart-total").innerText = "$" + finalTotal;

}

document.addEventListener("change", function(e){

    if(e.target.classList.contains("update-qty")){

        const id = e.target.dataset.id;
        const quantity = parseInt(e.target.value);

        const row = e.target.closest("tr");

        const price = parseFloat(row.children[3].innerText.replace("$",""));

        const subtotalCell = row.children[5];

        const newSubtotal = price * quantity;

        subtotalCell.innerText = "₹" + newSubtotal;

        updateCartTotal();

        fetch(`http://localhost:5050/carts/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                quantity:quantity
            })
        })
        .then(res => res.json())
.then(() => {
    updateCartCount(); // 🔥 THIS FIXES YOUR ISSUE
});

    }

});


// apply coupon

const applyBtn = document.getElementById("apply-coupon");

if(applyBtn){

applyBtn.addEventListener("click", function(){

const code = document.getElementById("coupon-input").value.trim();

if(code === "SAVE10"){
discount = 10;
alert("Coupon applied: ₹10 discount");
}
else if(code === "SAVE20"){
discount = 20;
alert("Coupon applied: ₹20 discount");
}
else{
alert("Invalid coupon");
discount = 0;
}

updateCartTotal();

});

}

updateCartCount();



const checkOutBtn = document.getElementById('checkout-btn');

if (checkOutBtn) {

    checkOutBtn.addEventListener('click', async () => {

        const response = await fetch(
            "http://localhost:5050/payment",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: finalTotal
                })
            }
        );

        const data = await response.json();

        console.log(data);

        const options = {

            key: data.key,

            amount: data.order.amount,

            currency: "INR",

            name: "E-Commerce Website",

            description: "Test Transaction",

            order_id: data.order.id,

            handler: async function (response) {

                console.log(response);

                const verifyResponse = await fetch(
                    "http://localhost:5050/payment/verify",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    }
                );

                const verifyData = await verifyResponse.json();

                console.log(verifyData);

                if (verifyData.success) {
                //    alert("Payment Successful");

                    await fetch("http://localhost:5050/carts/clear", {
                        method: "DELETE"
                    });

                    window.location.href = "success.html";
                }
                else {
                    alert("Payment Verification Failed");
                }

            },

            theme: {
                color: "#3399cc"
            }

        };

       const rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {

            console.log(response.error);

            alert(response.error.description);

        });

        rzp.open();

    });

}


const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        try{

            const response = await fetch(
                "http://localhost:5050/api/auth/login",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            localStorage.setItem(
                "accessToken",
                data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if(data.user.role === "admin"){
                window.location.href =
                "admin.html";
            }
            else{
                window.location.href =
                "index.html";
            }

        }
        catch(error){
            console.log(error);
        }

    });

}



// ===============================
// LOAD PRODUCTS
// ===============================

const productList =
document.getElementById("product-list");

if(productList){

    fetch("http://localhost:5050/products")
    .then(res => res.json())
    .then(products => {

        let html =
        `<div class="admin-products-grid">`;

        products.forEach(product => {

            html += `
            <div class="admin-product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </div>

                <div class="product-content">

                    <span class="brand">
                        ${product.brand}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="stars">
                        ★★★★★
                    </div>

                    <div class="price">
                        ₹${product.price}
                    </div>

                    <div class="admin-actions">

                        <button
                            class="edit-btn"
                            onclick="editProduct('${product._id}')">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            data-id="${product._id}">

                            Delete

                        </button>

                    </div>

                </div>

            </div>
            `;
        });

        html += `</div>`;

        productList.innerHTML = html;

    })
    .catch(error => {
        console.log(error);
    });

}


// ===============================
// EDIT PRODUCT
// ===============================

function editProduct(id){

    window.location.href =
    `edit-product.html?id=${id}`;

}


// ===============================
// DELETE PRODUCT
// ===============================

document.addEventListener("click",(e)=>{

    const btn =
    e.target.closest(".delete-btn");

    if(!btn) return;

    const id = btn.dataset.id;

    if(!confirm("Delete this product?")) return;

    fetch(
        `http://localhost:5050/products/${id}`,
        {
            method:"DELETE"
        }
    )
    .then(res => res.json())
    .then(data => {

        alert(data.message);

        location.reload();

    })
    .catch(error => {
        console.log(error);
    });

});


// ===============================
// ADD PRODUCT
// ===============================

const form =
document.getElementById("productForm");

if(form){

    form.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const product = {

            brand:
            document.getElementById("brand").value,

            name:
            document.getElementById("name").value,

            price:
            Number(
                document.getElementById("price").value
            ),

            image:
            document.getElementById("image").value,

            category:
            document.getElementById("category").value

        };

        try{

            const response =
            await fetch(
                "http://localhost:5050/products",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(product)
                }
            );

            const data =
            await response.json();

            document.getElementById("success-msg")
            .textContent =
            "✅ Product Added Successfully";

            form.reset();

        }
        catch(error){

            console.log(error);

        }

    });

}

const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

// menuBtn.addEventListener('click', () => {
//     sidebar.classList.toggle('show');
// });



/* register page script*/

const registerBtn = document.getElementById('registerBtn');

if (registerBtn) {

registerBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    const userNameField = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const userPass = document.getElementById('password').value;

    try {

        const response = await fetch(
            "http://localhost:5050/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
               body: JSON.stringify({
                    username: userNameField,
                    email: userEmail,
                    password: userPass
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const errormsg = document.querySelector('.error-msg');
            errormsg.textContent = data.message || "User Already Exists";
            document.getElementById('registerForm').reset();
        } else {
            window.location.href = "login.html";
        }

    } catch (err) {
        console.log(err);
    }

    form.reset();

});

}