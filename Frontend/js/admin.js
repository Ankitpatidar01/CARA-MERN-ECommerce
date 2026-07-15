// ===============================
// LOAD PRODUCTS
// ===============================

const productList =
document.getElementById("product-list");

if(productList){

    fetch(`${API_URL}/products`)
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

    fetch(`${API_URL}/products/${id}`,
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
            await fetch(`${API_URL}/products`,
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
