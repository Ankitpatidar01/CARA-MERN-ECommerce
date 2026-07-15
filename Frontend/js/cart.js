let discount = 0;
let finalTotal = 0;

function updateCartCount() {

    fetch(`${API_URL}/carts`, {
        headers: authHeaders
    })
    .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
    })
    .then(cart => {

        let count = 0;

        cart.forEach(item => {
            count += item.quantity;
        });

        const desktopCount = document.getElementById("cart-count");
        const mobileCount = document.getElementById("cart-count-mobile");

        if (desktopCount) desktopCount.innerText = count;
        if (mobileCount) mobileCount.innerText = count;

    })
    .catch(err => console.log(err));

}


if (window.location.pathname.includes("cart.html")) {

    fetch(`${API_URL}/carts`, {
        headers: authHeaders
    })
    .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
    })
    .then(cart => {

        const table = document.getElementById("cart-items");

        if (!table) return;

        table.innerHTML = "";

        let total = 0;

        cart.forEach(item => {

            if (!item.productId) return;

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

                                <td>${product.name}</td>

                                <td>₹${product.price}</td>

                                <td>
                                <input type="number" class="update-qty" data-id="${item._id}" value="${item.quantity}">
                                </td>

                                <td>₹${subtotal}</td>

                                </tr>
                                `;

        });

        finalTotal = total;

        const subtotalElement = document.getElementById("cart-subtotal");
        const totalElement = document.getElementById("cart-total");

        if (subtotalElement) subtotalElement.innerText = "₹" + total;
        if (totalElement) totalElement.innerText = "₹" + total;

    })
    .catch(err => console.log(err));

}


document.addEventListener("click", (e) => {

    const removeBtn = e.target.closest(".remove-item");

    if (!removeBtn) return;

    const id = removeBtn.dataset.id;

    fetch(`${API_URL}/carts/${id}`, {
        method: "DELETE",
        headers: authHeaders
    })
    .then(res => res.json())
    .then(() => {
        updateCartCount();
        location.reload();
    });

});



function updateCartTotal() {

    const rows = document.querySelectorAll("#cart-items tr");

    let subtotal = 0;

    rows.forEach(row => {

        const subtotalText = row.children[5].innerText;
        const value = parseFloat(subtotalText.replace("₹", ""));

        subtotal += value;

    });

    finalTotal = subtotal - discount;

    document.getElementById("cart-subtotal").innerText = "₹" + subtotal;
    document.getElementById("cart-total").innerText = "₹" + finalTotal;

}


document.addEventListener("change", function(e) {

    if (!e.target.classList.contains("update-qty")) return;

    const id = e.target.dataset.id;
    const quantity = parseInt(e.target.value);

    const row = e.target.closest("tr");
    const price = parseFloat(row.children[3].innerText.replace("₹", ""));
    const subtotalCell = row.children[5];

    const newSubtotal = price * quantity;

    subtotalCell.innerText = "₹" + newSubtotal;

    updateCartTotal();

    fetch(`${API_URL}/carts/${id}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({
            quantity: quantity
        })
    })
    .then(res => res.json())
    .then(() => {
        updateCartCount();
    });

});


updateCartCount();