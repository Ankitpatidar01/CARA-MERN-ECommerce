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

fetch(`${API_URL}/products`)
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

        fetch(`${API_URL}/carts`,{
            method:"POST",
            headers: authHeaders,
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