/* ==========================================
                ORDERS PAGE
========================================== */

let orders = [];
let filteredOrders = [];

let currentPage = 1;
const ordersPerPage = 5;

let currentFilter = "all";
let currentSort = "newest";

/* ==========================================
                DOM ELEMENTS
========================================== */

const ordersContainer =
    document.getElementById("orders-container");

const loadingContainer =
    document.getElementById("orders-loading");

const emptyContainer =
    document.getElementById("orders-empty");

const sortDropdown =
    document.getElementById("sortOrders");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const paginationNumbers =
    document.getElementById("paginationNumbers");

const prevPageBtn =
    document.getElementById("prevPage");

const nextPageBtn =
    document.getElementById("nextPage");

const orderTemplate =
    document.getElementById("orderTemplate");

const productTemplate =
    document.getElementById("productTemplate");

/* ==========================================
                INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

});

/* ==========================================
                LOAD ORDERS
========================================== */

async function loadOrders() {

    try {

        showLoading();

        const response = await fetch(
            `${API_URL}/orders`,
            {
                method: "GET",
                headers: authHeaders
            }
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load orders."
            );

        }

        const data =
            await response.json();

        console.log("Orders :", data);

        if (Array.isArray(data)) {

            orders = data;

        }

        else if (Array.isArray(data.orders)) {

            orders = data.orders;

        }

        else if (
            data.data &&
            Array.isArray(data.data.orders)
        ) {

            orders = data.data.orders;

        }

        else {

            orders = [];

        }

        filteredOrders = [...orders];

        currentPage = 1;

        hideLoading();

        applySorting();

    }

    catch (error) {

        console.error(error);

        hideLoading();

        showError(error.message);

    }

}

/* ==========================================
                LOADING
========================================== */

function showLoading() {

    loadingContainer.style.display =
        "flex";

    ordersContainer.style.display =
        "none";

    emptyContainer.style.display =
        "none";

}

function hideLoading() {

    loadingContainer.style.display =
        "none";

    ordersContainer.style.display =
        "flex";

}

/* ==========================================
                EMPTY STATE
========================================== */

function showEmptyState() {

    emptyContainer.style.display =
        "block";

    ordersContainer.style.display =
        "none";

}

function hideEmptyState() {

    emptyContainer.style.display =
        "none";

    ordersContainer.style.display =
        "flex";

}

/* ==========================================
                ERROR
========================================== */

function showError(message) {

    ordersContainer.style.display =
        "flex";

    ordersContainer.innerHTML = `

        <div class="empty-orders">

            <h2>
                Something went wrong
            </h2>

            <p>${message}</p>

        </div>

    `;

}

/* ==========================================
                RENDER ORDERS
========================================== */

function renderOrders() {

    ordersContainer.innerHTML = "";

    if (filteredOrders.length === 0) {

        showEmptyState();

        renderPagination();

        return;

    }

    hideEmptyState();

    const startIndex =
        (currentPage - 1) * ordersPerPage;

    const endIndex =
        startIndex + ordersPerPage;

    const currentOrders =
        filteredOrders.slice(
            startIndex,
            endIndex
        );

    currentOrders.forEach(order => {

        ordersContainer.appendChild(
            createOrderCard(order)
        );

    });

    renderPagination();

}

/* ==========================================
                CREATE ORDER CARD
========================================== */

function createOrderCard(order) {

    const template =
        orderTemplate.content.cloneNode(true);

    template.querySelector(".order-db-id").value =
        order._id;

    template.querySelector(".order-id").textContent =
        `#${order._id.slice(-6).toUpperCase()}`;

    template.querySelector(".order-date").textContent =
        formatDate(order.createdAt);

    template.querySelector(".item-count strong").textContent =
        getTotalItems(order);

    template.querySelector(".order-total h2").textContent =
        formatCurrency(order.totalAmount);

    const paymentContainer =
        template.querySelector(".payment-status");

    paymentContainer.innerHTML = "";

    paymentContainer.appendChild(
        createPaymentBadge(
            order.paymentStatus
        )
    );

    const deliveryContainer =
        template.querySelector(".delivery-status");

    deliveryContainer.innerHTML = "";

    deliveryContainer.appendChild(
        createStatusBadge(
            order.orderStatus
        )
    );

    const productsContainer =
        template.querySelector(".products-container");

    productsContainer.innerHTML = "";

    order.products.forEach(item => {

        productsContainer.appendChild(
            createProductRow(item)
        );

    });

    template
        .querySelector(".details-btn")
        .addEventListener(
            "click",
            () => showOrderDetails(order)
        );

    return template;

}

/* ==========================================
                CREATE PRODUCT ROW
========================================== */

function createProductRow(item) {

    const template =
        productTemplate.content.cloneNode(true);

    const product =
        item.productId;

    const image =
        template.querySelector("img");

    image.src =
        product.image ||
        "image/products/default.jpg";

    image.alt =
        product.name ||
        "Product";

    template.querySelector(".product-name").textContent =
        product.name ||
        "Unnamed Product";

    template.querySelector(".product-brand").textContent =
        product.brand ||
        "CARA";

    const size =
        template.querySelector(".product-size");

    if (size) {

        size.textContent =
            product.size
                ? `Size : ${product.size}`
                : "";

    }

    const color =
        template.querySelector(".product-color");

    if (color) {

        color.textContent =
            product.color
                ? `Color : ${product.color}`
                : "";

    }

    template.querySelector(".product-qty").textContent =
        `Qty : ${item.quantity}`;

    template.querySelector(".product-price").textContent =
        formatCurrency(product.price);

    template.querySelector(".product-subtotal").textContent =
        formatCurrency(
            product.price * item.quantity
        );

    return template;

}

/* ==========================================
                PAYMENT BADGE
========================================== */

function createPaymentBadge(status) {

    const badge =
        document.createElement("span");

    badge.classList.add("badge");

    status = (status || "Pending").toLowerCase();

    switch (status) {

        case "paid":

            badge.classList.add("badge-paid");
            badge.textContent = "Paid";
            break;

        case "pending":

            badge.classList.add("badge-processing");
            badge.textContent = "Pending";
            break;

        case "failed":

            badge.classList.add("badge-cancelled");
            badge.textContent = "Failed";
            break;

        default:

            badge.classList.add("badge-processing");
            badge.textContent = status;

    }

    return badge;

}

/* ==========================================
                ORDER STATUS BADGE
========================================== */

function createStatusBadge(status) {

    const badge =
        document.createElement("span");

    badge.classList.add("badge");

    status = (status || "Processing").toLowerCase();

    switch (status) {

        case "processing":

            badge.classList.add("badge-processing");
            badge.textContent = "Processing";
            break;

        case "shipped":

            badge.classList.add("badge-shipped");
            badge.textContent = "Shipped";
            break;

        case "delivered":

            badge.classList.add("badge-delivered");
            badge.textContent = "Delivered";
            break;

        case "cancelled":

            badge.classList.add("badge-cancelled");
            badge.textContent = "Cancelled";
            break;

        default:

            badge.classList.add("badge-processing");
            badge.textContent = status;

    }

    return badge;

}

/* ==========================================
                FORMAT DATE
========================================== */

function formatDate(date) {

    if (!date) return "--";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}

/* ==========================================
                FORMAT CURRENCY
========================================== */

function formatCurrency(amount) {

    amount = Number(amount) || 0;

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount);

}

/* ==========================================
                TOTAL ITEMS
========================================== */

function getTotalItems(order) {

    if (!order.products) return 0;

    return order.products.reduce(

        (total, item) => {

            return total + (item.quantity || 0);

        },

        0

    );

}

/* ==========================================
                ORDER TOTAL
========================================== */

function getOrderTotal(order) {

    if (order.totalAmount) {

        return order.totalAmount;

    }

    if (!order.products) {

        return 0;

    }

    return order.products.reduce(

        (total, item) => {

            const price =
                item.productId?.price || 0;

            return total + (price * item.quantity);

        },

        0

    );

}

/* ==========================================
                FILTER ORDERS
========================================== */

function applyFilter(status) {

    currentFilter = status;

    currentPage = 1;

    if (status === "all") {

        filteredOrders = [...orders];

    }

    else {

        filteredOrders = orders.filter(order => {

            return (
                order.orderStatus &&
                order.orderStatus.toLowerCase() ===
                status.toLowerCase()
            );

        });

    }

    applySorting();

}

/* ==========================================
                SORT ORDERS
========================================== */

function applySorting() {

    filteredOrders.sort((firstOrder, secondOrder) => {

        switch (currentSort) {

            case "oldest":

                return new Date(firstOrder.createdAt) -
                    new Date(secondOrder.createdAt);

            case "high":

                return getOrderTotal(secondOrder) -
                    getOrderTotal(firstOrder);

            case "low":

                return getOrderTotal(firstOrder) -
                    getOrderTotal(secondOrder);

            default:

                return new Date(secondOrder.createdAt) -
                    new Date(firstOrder.createdAt);

        }

    });

    renderOrders();

}

/* ==========================================
                PAGINATION
========================================== */

function renderPagination() {

    paginationNumbers.innerHTML = "";

    const totalPages = Math.ceil(
        filteredOrders.length / ordersPerPage
    );

    if (totalPages <= 1) {

        prevPageBtn.style.display = "none";
        nextPageBtn.style.display = "none";

        return;

    }

    prevPageBtn.style.display = "inline-flex";
    nextPageBtn.style.display = "inline-flex";

    for (let page = 1; page <= totalPages; page++) {

        const button =
            document.createElement("button");

        button.className = "page-btn";

        if (page === currentPage) {

            button.classList.add("active");

        }

        button.textContent = page;

        button.addEventListener("click", () => {

            currentPage = page;

            renderOrders();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

        paginationNumbers.appendChild(button);

    }

    prevPageBtn.disabled =
        currentPage === 1;

    nextPageBtn.disabled =
        currentPage === totalPages;

}

/* ==========================================
                PREVIOUS PAGE
========================================== */

prevPageBtn.addEventListener("click", () => {

    if (currentPage === 1) {

        return;

    }

    currentPage--;

    renderOrders();

});

/* ==========================================
                NEXT PAGE
========================================== */

nextPageBtn.addEventListener("click", () => {

    const totalPages = Math.ceil(
        filteredOrders.length / ordersPerPage
    );

    if (currentPage === totalPages) {

        return;

    }

    currentPage++;

    renderOrders();

});

/* ==========================================
                FILTER BUTTONS
========================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        applyFilter(
            button.dataset.filter
        );

    });

});

/* ==========================================
                SORT DROPDOWN
========================================== */

sortDropdown.addEventListener("change", event => {

    currentSort = event.target.value;

    applySorting();

});

/* ==========================================
                VIEW ORDER DETAILS
========================================== */

function showOrderDetails(order) {

    let message = "";

    message += `Order ID : ${order._id}\n\n`;

    message += `Order Date : ${formatDate(order.createdAt)}\n\n`;

    message += `Order Status : ${order.orderStatus}\n`;

    message += `Payment Status : ${order.paymentStatus}\n\n`;

    message += `Products\n`;

    message += "---------------------------------\n";

    order.products.forEach(item => {

        const product =
            item.productId;

        message += `${product.name}\n`;

        message += `Qty : ${item.quantity}\n`;

        message += `Price : ${formatCurrency(product.price)}\n`;

        message += `Subtotal : ${formatCurrency(product.price * item.quantity)}\n`;

        message += "---------------------------------\n";

    });

    message += `\nTotal Amount : ${formatCurrency(getOrderTotal(order))}`;

    alert(message);

}

/* ==========================================
                REFRESH
========================================== */

function refreshOrders() {

    currentPage = 1;

    applyFilter(currentFilter);

}

/* ==========================================
                IMAGE FALLBACK
========================================== */

document.addEventListener("error", function (event) {

    const element = event.target;

    if (
        element.tagName === "IMG" &&
        element.src &&
        !element.dataset.failed
    ) {

        element.dataset.failed = "true";

        element.src =
            "image/products/default.jpg";

    }

}, true);

/* ==========================================
                WINDOW RESIZE
========================================== */

window.addEventListener("resize", () => {

    if (currentPage > 1) {

        renderPagination();

    }

});

/* ==========================================
                PAGE VISIBILITY
========================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!document.hidden) {

            refreshOrders();

        }

    }
);

/* ==========================================
                DEBUG
========================================== */

console.log(
    "Orders page initialized successfully."
);