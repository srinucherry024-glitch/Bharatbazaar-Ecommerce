/* =========================================================
   BHARATBAZAAR CUSTOMER APP
   COMPLETE ORDER + CART + DELIVERY SYSTEM
========================================================= */

let cart = [];
let wishlist = [];
let orders = [];

let selectedCategory = "All";
let searchTerm = "";
let selectedDelivery = null;


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    cart = bbGet(BB_KEYS.CART, []);
    wishlist = bbGet(BB_KEYS.WISHLIST, []);

    /*
       IMPORTANT:
       Always load latest orders from localStorage.
       Do NOT create a new demo order if orders already exist.
    */
    orders = bbGet(BB_KEYS.ORDERS, []);

    if (!Array.isArray(orders)) {
        orders = [];
        bbSet(BB_KEYS.ORDERS, orders);
    }

    /*
       Seed demo orders only when there are absolutely
       no customer orders and demo orders are available.
    */
    if (
        orders.length === 0 &&
        typeof BB_DEMO_ORDERS !== "undefined" &&
        Array.isArray(BB_DEMO_ORDERS) &&
        BB_DEMO_ORDERS.length
    ) {
        orders = JSON.parse(JSON.stringify(BB_DEMO_ORDERS));
        bbSet(BB_KEYS.ORDERS, orders);
    }

    ensureCustomerProfile();

    renderCategories();
    renderProducts();
    updateCounts();
    bindEvents();
});


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", e => {

            searchTerm = e.target.value
                .trim()
                .toLowerCase();

            const clearSearch =
                document.getElementById("clearSearch");

            if (clearSearch) {
                clearSearch.style.display =
                    searchTerm ? "block" : "none";
            }

            renderProducts();
        });
    }


    const clearSearch =
        document.getElementById("clearSearch");

    if (clearSearch) {

        clearSearch.addEventListener("click", () => {

            const input =
                document.getElementById("searchInput");

            if (input) {
                input.value = "";
            }

            searchTerm = "";
            clearSearch.style.display = "none";

            renderProducts();
        });
    }


    const shopNowBtn =
        document.getElementById("shopNowBtn");

    if (shopNowBtn) {

        shopNowBtn.addEventListener("click", () => {

            const section =
                document.querySelector(".products-section");

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });
    }


    const showAllBtn =
        document.getElementById("showAllBtn");

    if (showAllBtn) {

        showAllBtn.addEventListener("click", () => {

            selectedCategory = "All";
            searchTerm = "";

            const input =
                document.getElementById("searchInput");

            if (input) {
                input.value = "";
            }

            renderCategories();
            renderProducts();
        });
    }


    const cartBtn =
        document.getElementById("cartBtn");

    if (cartBtn) {

        cartBtn.addEventListener("click", () => {

            renderCart();
            openModal("cartModal");

        });
    }


    const wishlistBtn =
        document.getElementById("wishlistBtn");

    if (wishlistBtn) {

        wishlistBtn.addEventListener("click", () => {

            renderWishlist();
            openModal("wishlistModal");

        });
    }


    const ordersBtn =
        document.getElementById("ordersBtn");

    if (ordersBtn) {

        ordersBtn.addEventListener("click", () => {

            /*
               Reload latest orders before displaying.
            */
            reloadOrders();

            renderOrders();
            openModal("ordersModal");

        });
    }


    const deliveryBtn =
        document.getElementById("deliveryBtn");

    if (deliveryBtn) {

        deliveryBtn.addEventListener("click", () => {

            reloadOrders();

            renderDelivery();
            openModal("deliveryModal");

        });
    }


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener("click", () => {

                closeModal(
                    button.dataset.close
                );

            });

        });


    document
        .querySelectorAll(".bb-modal")
        .forEach(modal => {

            modal.addEventListener("click", e => {

                if (e.target === modal) {
                    closeModal(modal.id);
                }

            });

        });


    const checkoutForm =
        document.getElementById("checkoutForm");

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            placeOrder
        );

    }


    const verifyPinBtn =
        document.getElementById("verifyPinBtn");

    if (verifyPinBtn) {

        verifyPinBtn.addEventListener(
            "click",
            verifyDeliveryPin
        );

    }


    const rejectDeliveryBtn =
        document.getElementById("rejectDeliveryBtn");

    if (rejectDeliveryBtn) {

        rejectDeliveryBtn.addEventListener(
            "click",
            rejectSelectedDelivery
        );

    }


    const deliveryPinInput =
        document.getElementById("deliveryPinInput");

    if (deliveryPinInput) {

        deliveryPinInput.addEventListener(
            "input",
            e => {

                e.target.value =
                    e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);

            }
        );

    }

}


/* =========================================================
   RELOAD ORDERS
========================================================= */

function reloadOrders() {

    const latest =
        bbGet(BB_KEYS.ORDERS, []);

    orders =
        Array.isArray(latest)
            ? latest
            : [];

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

    const nav =
        document.getElementById("categoryNav");

    if (!nav) return;

    nav.innerHTML =
        BB_CATEGORIES.map(category => `

            <button
                class="category-btn ${
                    category === selectedCategory
                        ? "active"
                        : ""
                }"
                onclick="selectCategory(
                    '${escapeAttribute(category)}'
                )"
            >
                ${escapeHtml(category)}
            </button>

        `).join("");
}


window.selectCategory = function(category) {

    selectedCategory = category;

    renderCategories();
    renderProducts();

    const section =
        document.querySelector(".products-section");

    if (section) {

        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: "smooth"
        });

    }

};


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts() {

    const grid =
        document.getElementById("productGrid");

    const empty =
        document.getElementById("emptyProducts");

    if (!grid) return;

    let products =
        bbGetProducts();


    if (selectedCategory !== "All") {

        products =
            products.filter(
                product =>
                    product.category === selectedCategory
            );

    }


    if (searchTerm) {

        products =
            products.filter(product => {

                const text = `
                    ${product.title}
                    ${product.category}
                    ${product.brand}
                    ${product.description}
                    ${product.seller}
                `.toLowerCase();

                return text.includes(searchTerm);

            });

    }


    const heading =
        document.getElementById("productHeading");

    if (heading) {

        heading.textContent =
            selectedCategory === "All"
                ? "All Products"
                : selectedCategory;

    }


    const resultInfo =
        document.getElementById("resultInfo");

    if (resultInfo) {

        resultInfo.textContent =
            `${products.length} products`;

    }


    if (!products.length) {

        grid.innerHTML = "";

        if (empty) {
            empty.classList.remove("d-none");
        }

        return;
    }


    if (empty) {
        empty.classList.add("d-none");
    }


    grid.innerHTML =
        products
            .map(productCard)
            .join("");

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

    const discount =
        bbDiscount(product);

    const isWish =
        wishlist.includes(product.id);

    return `

        <article class="product-card">

            <div class="product-image-wrap">

                <img
                    class="product-image"
                    src="${escapeAttribute(product.image)}"
                    alt="${escapeAttribute(product.title)}"
                    loading="lazy"
                    decoding="async"
                    onerror="
                        this.onerror=null;
                        this.src='${fallbackImage(product.title)}'
                    "
                >

                ${
                    discount
                    ? `
                        <span class="discount-tag">
                            ${discount}% OFF
                        </span>
                    `
                    : ""
                }


                <button
                    class="heart-btn ${
                        isWish ? "active" : ""
                    }"
                    onclick="
                        toggleWishlist(
                            ${product.id},
                            this
                        )
                    "
                    aria-label="Wishlist"
                >

                    <i class="bi ${
                        isWish
                            ? "bi-heart-fill"
                            : "bi-heart"
                    }"></i>

                </button>

            </div>


            <div class="product-body">

                <div class="product-brand">
                    ${escapeHtml(product.brand)}
                </div>


                <div class="product-title">
                    ${escapeHtml(product.title)}
                </div>


                <div>

                    <span class="product-rating">

                        ${product.rating}

                        <i class="bi bi-star-fill"></i>

                    </span>

                    <span class="review-count">
                        (${product.reviews})
                    </span>

                </div>


                <div class="price-row">

                    <span class="price">
                        ₹${formatMoney(product.price)}
                    </span>

                    ${
                        product.originalPrice >
                        product.price

                        ? `
                            <span class="original-price">
                                ₹${formatMoney(
                                    product.originalPrice
                                )}
                            </span>
                        `
                        : ""
                    }

                </div>


                <div class="product-actions">

                    <button
                        class="add-cart-btn"
                        onclick="
                            addToCart(${product.id})
                        "
                    >

                        <i class="bi bi-cart-plus"></i>

                        Add to Cart

                    </button>


                    <button
                        class="view-btn"
                        onclick="
                            openProduct(${product.id})
                        "
                    >
                        View
                    </button>

                </div>

            </div>

        </article>

    `;
}


/* =========================================================
   WISHLIST
========================================================= */

window.toggleWishlist = function(productId, button) {

    const index =
        wishlist.indexOf(productId);


    if (index === -1) {

        wishlist.push(productId);

        if (button) {

            button.classList.add("active");

            button.innerHTML =
                '<i class="bi bi-heart-fill"></i>';

        }

        showToast(
            "Added to wishlist",
            "success"
        );

    } else {

        wishlist.splice(index, 1);

        if (button) {

            button.classList.remove("active");

            button.innerHTML =
                '<i class="bi bi-heart"></i>';

        }

        showToast(
            "Removed from wishlist",
            "success"
        );

    }


    bbSet(
        BB_KEYS.WISHLIST,
        wishlist
    );

    updateCounts();

};


function renderWishlist() {

    const box =
        document.getElementById("wishlistItems");

    if (!box) return;


    const products =
        wishlist
            .map(id =>
                bbGetProductById(id)
            )
            .filter(Boolean);


    if (!products.length) {

        box.innerHTML = `

            <div class="empty-modal">

                <i class="bi bi-heart"></i>

                <h4>
                    Your wishlist is empty
                </h4>

                <p>
                    Save products you love
                    and find them here.
                </p>

            </div>

        `;

        return;
    }


    box.innerHTML =
        products.map(product => `

            <div class="wishlist-card">

                <img
                    src="${escapeAttribute(product.image)}"
                    alt="${escapeAttribute(product.title)}"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='${fallbackImage(product.title)}'
                    "
                >


                <div class="wishlist-card-info">

                    <strong>
                        ${escapeHtml(product.title)}
                    </strong>

                    <div class="cart-item-price">
                        ₹${formatMoney(product.price)}
                    </div>

                </div>


                <button
                    class="add-cart-btn"
                    style="padding:8px 12px"
                    onclick="
                        addToCart(${product.id})
                    "
                >
                    Add to Cart
                </button>


                <button
                    class="remove-btn"
                    onclick="
                        toggleWishlist(${product.id});
                        renderWishlist();
                    "
                >

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `).join("");

}


/* =========================================================
   CART
========================================================= */

window.addToCart = function(productId) {

    const product =
        bbGetProductById(productId);

    if (!product) {

        showToast(
            "Product not found",
            "error"
        );

        return;
    }


    const existing =
        cart.find(
            item =>
                String(item.productId) ===
                String(productId)
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            productId: product.id,
            quantity: 1
        });

    }


    saveCart();
    updateCounts();

    showToast(
        "Product added to cart",
        "success"
    );

};


function saveCart() {

    bbSet(
        BB_KEYS.CART,
        cart
    );

}


function renderCart() {

    const box =
        document.getElementById("cartItems");

    const footer =
        document.getElementById("cartFooter");

    if (!box || !footer) return;


    const items =
        cart
            .map(item => {

                const product =
                    bbGetProductById(
                        item.productId
                    );

                return product
                    ? {
                        ...item,
                        product
                    }
                    : null;

            })
            .filter(Boolean);


    const count =
        items.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const modalCount =
        document.getElementById(
            "cartModalCount"
        );

    if (modalCount) {
        modalCount.textContent =
            `${count} items`;
    }


    if (!items.length) {

        box.innerHTML = `

            <div class="empty-modal">

                <i class="bi bi-cart3"></i>

                <h4>
                    Your cart is empty
                </h4>

                <p>
                    Add some products
                    to continue shopping.
                </p>

            </div>

        `;

        footer.innerHTML = "";

        return;
    }


    box.innerHTML =
        items.map(item => `

            <div class="cart-item">

                <img
                    class="cart-item-image"
                    src="${escapeAttribute(
                        item.product.image
                    )}"
                    alt="${escapeAttribute(
                        item.product.title
                    )}"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='${fallbackImage(
                            item.product.title
                        )}'
                    "
                >


                <div class="cart-item-info">

                    <div class="cart-item-title">
                        ${escapeHtml(
                            item.product.title
                        )}
                    </div>

                    <div class="cart-item-price">
                        ₹${formatMoney(
                            item.product.price
                        )}
                    </div>

                </div>


                <div class="qty-controls">

                    <button
                        onclick="
                            changeQty(
                                ${item.productId},
                                -1
                            )
                        "
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="
                            changeQty(
                                ${item.productId},
                                1
                            )
                        "
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="
                        removeFromCart(
                            ${item.productId}
                        )
                    "
                >

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `).join("");


    const total =
        items.reduce(
            (sum, item) =>
                sum +
                item.product.price *
                item.quantity,
            0
        );


    footer.innerHTML = `

        <div>

            <div
                style="
                    font-size:11px;
                    color:#888
                "
            >
                Total Amount
            </div>

            <div class="cart-total">
                ₹${formatMoney(total)}
            </div>

        </div>


        <button
            class="primary-btn"
            onclick="openCheckout()"
        >

            Proceed to Checkout

            <i class="bi bi-arrow-right"></i>

        </button>

    `;

}


window.changeQty = function(productId, delta) {

    const item =
        cart.find(
            i =>
                String(i.productId) ===
                String(productId)
        );

    if (!item) return;


    item.quantity += delta;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                i =>
                    String(i.productId) !==
                    String(productId)
            );

    }


    saveCart();
    updateCounts();
    renderCart();

};


window.removeFromCart = function(productId) {

    cart =
        cart.filter(
            i =>
                String(i.productId) !==
                String(productId)
        );


    saveCart();
    updateCounts();
    renderCart();


    showToast(
        "Product removed from cart",
        "success"
    );

};


/* =========================================================
   PRODUCT DETAILS
========================================================= */

window.openProduct = function(productId) {

    const product =
        bbGetProductById(productId);

    if (!product) return;


    const discount =
        bbDiscount(product);


    const details =
        document.getElementById(
            "productDetails"
        );

    if (!details) return;


    details.innerHTML = `

        <div class="product-detail-grid">

            <div>

                <img
                    class="detail-image"
                    src="${escapeAttribute(
                        product.image
                    )}"
                    alt="${escapeAttribute(
                        product.title
                    )}"
                    onerror="
                        this.onerror=null;
                        this.src='${fallbackImage(
                            product.title
                        )}'
                    "
                >

            </div>


            <div>

                <div class="product-brand">
                    ${escapeHtml(product.brand)}
                </div>


                <h2 class="detail-title">
                    ${escapeHtml(product.title)}
                </h2>


                <div>

                    <span class="product-rating">

                        ${product.rating}

                        <i class="bi bi-star-fill"></i>

                    </span>


                    <span class="review-count">
                        ${product.reviews} reviews
                    </span>

                </div>


                <div class="detail-price">
                    ₹${formatMoney(product.price)}
                </div>


                ${
                    product.originalPrice >
                    product.price

                    ? `
                        <span class="original-price">
                            ₹${formatMoney(
                                product.originalPrice
                            )}
                        </span>

                        <span
                            style="
                                color:#16834b;
                                font-size:12px;
                                font-weight:800;
                                margin-left:5px
                            "
                        >
                            ${discount}% OFF
                        </span>
                    `
                    : ""
                }


                <p class="detail-description">
                    ${escapeHtml(
                        product.description
                    )}
                </p>


                <div class="detail-stock">

                    <i class="bi bi-check-circle"></i>

                    ${product.stock}
                    units available

                </div>


                <div class="detail-meta">

                    <div>

                        <span>
                            Category
                        </span>

                        <strong>
                            ${escapeHtml(
                                product.category
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Seller
                        </span>

                        <strong>
                            ${escapeHtml(
                                product.seller
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Brand
                        </span>

                        <strong>
                            ${escapeHtml(
                                product.brand
                            )}
                        </strong>

                    </div>

                </div>


                <button
                    class="primary-btn full-btn"
                    onclick="
                        addToCart(${product.id});
                        closeModal('productModal')
                    "
                >

                    <i class="bi bi-cart-plus"></i>

                    Add to Cart

                </button>

            </div>

        </div>

    `;


    openModal("productModal");

};


/* =========================================================
   CHECKOUT
========================================================= */

window.openCheckout = function() {

    if (!cart.length) {

        showToast(
            "Your cart is empty",
            "error"
        );

        return;
    }


    closeModal("cartModal");


    const items =
        cart
            .map(item => {

                const product =
                    bbGetProductById(
                        item.productId
                    );

                return product
                    ? {
                        ...item,
                        product
                    }
                    : null;

            })
            .filter(Boolean);


    if (!items.length) {

        showToast(
            "No valid products in cart",
            "error"
        );

        return;
    }


    const total =
        items.reduce(
            (sum, item) =>
                sum +
                item.product.price *
                item.quantity,
            0
        );


    const summary =
        document.getElementById(
            "checkoutSummary"
        );


    if (summary) {

        summary.innerHTML = `

            <h3
                style="
                    font-size:15px;
                    font-weight:850;
                    margin-bottom:12px
                "
            >
                Order Summary
            </h3>


            ${items.map(item => `

                <div class="summary-row">

                    <span>

                        ${escapeHtml(
                            item.product.title
                        )}

                        × ${item.quantity}

                    </span>


                    <strong>

                        ₹${formatMoney(
                            item.product.price *
                            item.quantity
                        )}

                    </strong>

                </div>

            `).join("")}


            <div
                class="
                    summary-row
                    summary-total
                "
            >

                <span>
                    Total
                </span>

                <span>
                    ₹${formatMoney(total)}
                </span>

            </div>

        `;

    }


    const profile =
        bbGet(
            BB_KEYS.CUSTOMER,
            {}
        );


    setInputValue(
        "customerName",
        profile.name || ""
    );

    setInputValue(
        "customerPhone",
        profile.phone || ""
    );

    setInputValue(
        "customerAddress",
        profile.address || ""
    );

    setInputValue(
        "customerCity",
        profile.city || ""
    );

    setInputValue(
        "customerPincode",
        profile.pincode || ""
    );


    openModal("checkoutModal");

};


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder(e) {

    e.preventDefault();


    /*
       IMPORTANT:
       Reload latest orders before creating
       a new order so no existing admin/customer
       order gets overwritten.
    */

    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    if (!Array.isArray(orders)) {
        orders = [];
    }


    if (!cart.length) {

        showToast(
            "Your cart is empty",
            "error"
        );

        return;
    }


    const customer = {

        name:
            getInputValue("customerName"),

        phone:
            getInputValue("customerPhone"),

        address:
            getInputValue("customerAddress"),

        city:
            getInputValue("customerCity"),

        pincode:
            getInputValue("customerPincode")

    };


    if (!customer.name ||
        !customer.phone ||
        !customer.address ||
        !customer.city ||
        !customer.pincode
    ) {

        showToast(
            "Please fill all delivery details",
            "error"
        );

        return;
    }


    bbSet(
        BB_KEYS.CUSTOMER,
        customer
    );


    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const payment =
        paymentElement
            ? paymentElement.value
            : "COD";


    /*
       ONE order ID for the entire cart.
       Example:
       5 products = BB10001
       NOT BB10001, BB10002, BB10003...
    */

    const orderNumber =
        generateOrderId();


    /*
       Every cart product becomes one individual
       order item.
    */

    const items = [];


    cart.forEach(cartItem => {

        const product =
            bbGetProductById(
                cartItem.productId
            );


        if (!product) return;


        items.push({

            productId:
                product.id,

            title:
                product.title,

            category:
                product.category,

            price:
                Number(product.price),

            quantity:
                Number(cartItem.quantity),

            image:
                product.image,

            status:
                "Pending",

            otp:
                null,

            otpVerified:
                false,

            acceptedAt:
                null,

            shippedAt:
                null,

            outForDeliveryAt:
                null,

            deliveredAt:
                null,

            rejectedAt:
                null,

            rejectReason:
                ""

        });

    });


    if (!items.length) {

        showToast(
            "Unable to create order",
            "error"
        );

        return;
    }


    /*
       ONE ORDER OBJECT
       containing multiple independent items.
    */

    const order = {

        id:
            orderNumber,

        createdAt:
            Date.now(),

        customer:
            customer,

        payment:
            payment,

        items:
            items

    };


    /*
       Add newest order at beginning.
    */

    orders.unshift(order);


    /*
       MOST IMPORTANT:
       Save the complete order to the SAME
       localStorage key used by admin.js.
    */

    bbSet(
        BB_KEYS.ORDERS,
        orders
    );


    /*
       Immediately verify saved data.
    */

    const savedOrders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    if (!Array.isArray(savedOrders)) {

        showToast(
            "Order save failed",
            "error"
        );

        return;
    }


    /*
       Clear cart only after successful save.
    */

    cart = [];

    saveCart();
    updateCounts();


    closeModal("checkoutModal");


    showToast(
        `Order ${orderNumber} placed successfully`,
        "success"
    );


    /*
       Reload latest orders from localStorage.
    */

    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    setTimeout(() => {

        renderOrders();
        openModal("ordersModal");

    }, 400);

}


/* =========================================================
   ORDERS
========================================================= */

function renderOrders() {

    /*
       Always read latest data.
    */

    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    const box =
        document.getElementById(
            "ordersList"
        );

    if (!box) return;


    if (!orders.length) {

        box.innerHTML = `

            <div class="empty-modal">

                <i class="bi bi-box"></i>

                <h4>
                    No orders yet
                </h4>

                <p>
                    Your placed orders
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    box.innerHTML =
        orders.map(order => {

            const total =
                order.items.reduce(
                    (sum, item) =>
                        sum +
                        (
                            Number(item.price) *
                            Number(item.quantity)
                        ),
                    0
                );


            return `

                <div class="order-card">

                    <div class="order-top">

                        <div>

                            <div class="order-id">
                                ${escapeHtml(
                                    order.id
                                )}
                            </div>

                            <div class="order-date">

                                ${formatDate(
                                    order.createdAt
                                )}

                                •

                                ${escapeHtml(
                                    order.payment
                                )}

                            </div>

                        </div>


                        <div class="order-total">
                            ₹${formatMoney(total)}
                        </div>

                    </div>


                    <div class="order-items">

                        ${
                            order.items
                                .map(item =>
                                    orderItemHtml(
                                        order,
                                        item
                                    )
                                )
                                .join("")
                        }

                    </div>

                </div>

            `;

        }).join("");

}


/* =========================================================
   ORDER ITEM
========================================================= */

function orderItemHtml(order, item) {

    return `

        <div class="order-item">

            <img
                src="${escapeAttribute(
                    item.image
                )}"
                alt="${escapeAttribute(
                    item.title
                )}"
                loading="lazy"
                onerror="
                    this.onerror=null;
                    this.src='${fallbackImage(
                        item.title
                    )}'
                "
            >


            <div>

                <div class="order-item-title">
                    ${escapeHtml(
                        item.title
                    )}
                </div>


                <div class="order-item-meta">

                    Qty ${item.quantity}

                    • ₹${formatMoney(
                        item.price
                    )}

                    • ${escapeHtml(
                        item.category
                    )}

                </div>


                <button
                    class="track-btn"
                    onclick="
                        showItemTracking(
                            '${escapeAttribute(
                                order.id
                            )}',
                            ${item.productId}
                        )
                    "
                >

                    <i class="bi bi-geo-alt"></i>

                    Track Product

                </button>

            </div>


            <div>

                ${statusPill(
                    item.status
                )}

            </div>

        </div>

    `;

}


/* =========================================================
   INDIVIDUAL PRODUCT TRACKING
========================================================= */

window.showItemTracking =
function(orderId, productId) {

    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    const order =
        orders.find(
            o =>
                String(o.id) ===
                String(orderId)
        );


    if (!order) return;


    const item =
        order.items.find(
            i =>
                String(i.productId) ===
                String(productId)
        );


    if (!item) return;


    const html = `

        <div class="order-card">

            <div class="order-top">

                <div>

                    <div class="order-id">
                        ${escapeHtml(
                            order.id
                        )}
                    </div>

                    <div class="order-date">
                        Product tracking
                    </div>

                </div>


                ${statusPill(
                    item.status
                )}

            </div>


            <div class="order-items">

                <div class="order-item">

                    <img
                        src="${escapeAttribute(
                            item.image
                        )}"
                        alt="${escapeAttribute(
                            item.title
                        )}"
                        onerror="
                            this.onerror=null;
                            this.src='${fallbackImage(
                                item.title
                            )}'
                        "
                    >


                    <div>

                        <div class="order-item-title">
                            ${escapeHtml(
                                item.title
                            )}
                        </div>


                        <div class="order-item-meta">
                            Quantity:
                            ${item.quantity}
                        </div>

                    </div>


                    <strong>
                        ₹${formatMoney(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                </div>


                <div style="padding:15px 5px">

                    ${trackingSteps(item)}

                </div>


                ${
                    item.status ===
                    "Out for Delivery"

                    ? `

                        <button
                            class="primary-btn"
                            onclick="
                                openDeliveryPin(
                                    '${escapeAttribute(
                                        order.id
                                    )}',
                                    ${item.productId}
                                )
                            "
                        >

                            Enter Delivery PIN

                        </button>


                        <button
                            class="
                                danger-outline-btn
                                full-btn
                            "
                            onclick="
                                openDeliveryPin(
                                    '${escapeAttribute(
                                        order.id
                                    )}',
                                    ${item.productId},
                                    true
                                )
                            "
                        >

                            Reject Product

                        </button>

                    `
                    : ""
                }

            </div>

        </div>

    `;


    const box =
        document.getElementById(
            "ordersList"
        );


    if (box) {
        box.innerHTML = html;
    }

};


/* =========================================================
   TRACKING STEPS
========================================================= */

function trackingSteps(item) {

    const steps = [

        ["Pending", "bi-clock"],

        ["Accepted", "bi-check2-circle"],

        ["Shipped", "bi-box-seam"],

        ["Out for Delivery", "bi-truck"],

        ["Delivered", "bi-house-check"]

    ];


    const orderIndex =
        statusOrder(item.status);


    return `

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(5,1fr);
                gap:5px;
            "
        >

            ${steps.map(
                (step, index) => {

                    const active =
                        index <= orderIndex &&
                        item.status !==
                        "Rejected";


                    return `

                        <div
                            style="
                                text-align:center;
                                opacity:${
                                    active
                                        ? 1
                                        : .35
                                };
                            "
                        >

                            <div
                                style="
                                    width:34px;
                                    height:34px;
                                    border-radius:50%;
                                    margin:auto;
                                    display:grid;
                                    place-items:center;
                                    background:${
                                        active
                                            ? "#6c3df4"
                                            : "#eee"
                                    };
                                    color:${
                                        active
                                            ? "#fff"
                                            : "#777"
                                    };
                                "
                            >

                                <i
                                    class="
                                        bi ${step[1]}
                                    "
                                ></i>

                            </div>


                            <small
                                style="
                                    display:block;
                                    margin-top:5px;
                                    font-size:9px;
                                    font-weight:700;
                                "
                            >
                                ${step[0]}
                            </small>

                        </div>

                    `;

                }
            ).join("")}

        </div>


        ${
            item.status ===
            "Rejected"

            ? `

                <div
                    style="
                        margin-top:15px;
                        padding:12px;
                        background:#fff0f1;
                        color:#c52e3c;
                        border-radius:10px;
                        font-size:12px;
                        font-weight:700;
                    "
                >

                    Product rejected

                    ${
                        item.rejectReason
                            ? " • " +
                              escapeHtml(
                                  item.rejectReason
                              )
                            : ""
                    }

                </div>

            `
            : ""
        }

    `;

}


/* =========================================================
   OUT FOR DELIVERY
========================================================= */

function renderDelivery() {

    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    const box =
        document.getElementById(
            "deliveryList"
        );

    if (!box) return;


    const deliveryItems = [];


    orders.forEach(order => {

        if (!Array.isArray(order.items)) {
            return;
        }


        order.items.forEach(item => {

            if (
                item.status ===
                "Out for Delivery"
            ) {

                deliveryItems.push({
                    order,
                    item
                });

            }

        });

    });


    if (!deliveryItems.length) {

        box.innerHTML = `

            <div class="empty-modal">

                <i class="bi bi-truck"></i>

                <h4>
                    No products are
                    out for delivery
                </h4>

                <p>
                    Products will appear here
                    when the admin dispatches them.
                </p>

            </div>

        `;

        return;
    }


    box.innerHTML =
        deliveryItems
            .map(({ order, item }) => `

                <div class="delivery-item">

                    <div class="delivery-item-main">

                        <img
                            src="${escapeAttribute(
                                item.image
                            )}"
                            alt="${escapeAttribute(
                                item.title
                            )}"
                            loading="lazy"
                            onerror="
                                this.onerror=null;
                                this.src='${fallbackImage(
                                    item.title
                                )}'
                            "
                        >


                        <div>

                            <div class="order-item-title">
                                ${escapeHtml(
                                    item.title
                                )}
                            </div>


                            <div class="order-item-meta">
                                Order:
                                ${escapeHtml(
                                    order.id
                                )}
                            </div>


                            <div class="order-item-meta">
                                Qty:
                                ${item.quantity}
                            </div>


                            <div
                                style="
                                    margin-top:6px;
                                    color:#d97706;
                                    font-size:11px;
                                    font-weight:800;
                                "
                            >

                                <i class="bi bi-truck"></i>

                                Out for Delivery

                            </div>

                        </div>


                        <div class="delivery-actions">

                            <button
                                class="verify-btn"
                                onclick="
                                    openDeliveryPin(
                                        '${escapeAttribute(
                                            order.id
                                        )}',
                                        ${item.productId}
                                    )
                                "
                            >
                                Verify PIN
                            </button>


                            <button
                                class="reject-small"
                                onclick="
                                    openDeliveryPin(
                                        '${escapeAttribute(
                                            order.id
                                        )}',
                                        ${item.productId},
                                        true
                                    )
                                "
                            >
                                Reject
                            </button>

                        </div>

                    </div>

                </div>

            `)
            .join("");

}


/* =========================================================
   DELIVERY PIN
========================================================= */

window.openDeliveryPin =
function(orderId, productId, rejectMode = false) {

    selectedDelivery = {

        orderId:
            String(orderId),

        productId:
            String(productId)

    };


    const input =
        document.getElementById(
            "deliveryPinInput"
        );


    const message =
        document.getElementById(
            "pinMessage"
        );


    if (input) {
        input.value = "";
    }


    if (message) {
        message.innerHTML = "";
    }


    if (rejectMode && message) {

        message.innerHTML = `

            <div
                style="
                    color:#dc3545;
                    font-size:11px;
                    margin-bottom:8px;
                "
            >
                You can reject this product below.
            </div>

        `;

    }


    openModal("pinModal");

};


/* =========================================================
   VERIFY DELIVERY PIN
========================================================= */

function verifyDeliveryPin() {

    if (!selectedDelivery) return;


    const input =
        document.getElementById(
            "deliveryPinInput"
        );


    const message =
        document.getElementById(
            "pinMessage"
        );


    const pin =
        input
            ? input.value.trim()
            : "";


    if (!/^\d{4}$/.test(pin)) {

        if (message) {

            message.innerHTML = `

                <div
                    style="
                        color:#dc3545;
                        font-size:12px;
                        font-weight:700
                    "
                >
                    Enter a valid 4-digit PIN.
                </div>

            `;

        }

        return;
    }


    /*
       Reload latest orders before updating.
    */

    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    const order =
        orders.find(
            o =>
                String(o.id) ===
                String(
                    selectedDelivery.orderId
                )
        );


    if (!order) return;


    const item =
        order.items.find(
            i =>
                String(i.productId) ===
                String(
                    selectedDelivery.productId
                )
        );


    if (!item) return;


    if (
        item.status !==
        "Out for Delivery"
    ) {

        showToast(
            "This product is not out for delivery",
            "error"
        );

        closeModal("pinModal");

        return;
    }


    if (
        String(item.otp) !==
        String(pin)
    ) {

        if (message) {

            message.innerHTML = `

                <div
                    style="
                        color:#dc3545;
                        background:#fff0f1;
                        padding:10px;
                        border-radius:8px;
                        font-size:12px;
                        font-weight:700;
                    "
                >

                    Wrong PIN.
                    Product is still
                    Out for Delivery.

                </div>

            `;

        }

        return;
    }


    /*
       ONLY THIS PRODUCT becomes Delivered.
    */

    item.status =
        "Delivered";

    item.otpVerified =
        true;

    item.deliveredAt =
        Date.now();


    saveOrders();


    closeModal("pinModal");


    showToast(
        "Product delivered successfully",
        "success"
    );


    renderDelivery();


    setTimeout(() => {

        renderOrders();
        openModal("ordersModal");

    }, 300);

}


/* =========================================================
   REJECT PRODUCT
========================================================= */

function rejectSelectedDelivery() {

    if (!selectedDelivery) return;


    const reason =
        prompt(
            "Why are you rejecting this product?",
            "Product not required"
        );


    if (reason === null) {
        return;
    }


    orders =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    const order =
        orders.find(
            o =>
                String(o.id) ===
                String(
                    selectedDelivery.orderId
                )
        );


    if (!order) return;


    const item =
        order.items.find(
            i =>
                String(i.productId) ===
                String(
                    selectedDelivery.productId
                )
        );


    if (!item) return;


    if (
        item.status !==
        "Out for Delivery"
    ) {

        showToast(
            "This product is not out for delivery",
            "error"
        );

        closeModal("pinModal");

        return;
    }


    /*
       ONLY selected product becomes Rejected.
    */

    item.status =
        "Rejected";

    item.rejectedAt =
        Date.now();

    item.rejectReason =
        reason ||
        "Customer rejected the product";

    item.otp =
        null;

    item.otpVerified =
        false;


    saveOrders();


    closeModal("pinModal");


    showToast(
        "Product rejected successfully",
        "success"
    );


    renderDelivery();


    setTimeout(() => {

        renderOrders();
        openModal("ordersModal");

    }, 300);

}


/* =========================================================
   COUNTS
========================================================= */

function updateCounts() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            cart.reduce(
                (sum, item) =>
                    sum +
                    Number(item.quantity),
                0
            );

    }


    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


/* =========================================================
   SAVE ORDERS
========================================================= */

function saveOrders() {

    /*
       Save current orders.
    */

    bbSet(
        BB_KEYS.ORDERS,
        orders
    );


    /*
       Immediately reload saved data.
    */

    const saved =
        bbGet(
            BB_KEYS.ORDERS,
            []
        );


    if (Array.isArray(saved)) {
        orders = saved;
    }

}


/* =========================================================
   STATUS ORDER
========================================================= */

function statusOrder(status) {

    const statuses = [

        "Pending",

        "Accepted",

        "Shipped",

        "Out for Delivery",

        "Delivered"

    ];


    return statuses.indexOf(status);

}


/* =========================================================
   STATUS PILL
========================================================= */

function statusPill(status) {

    let cls =
        "status-pending";


    if (status === "Accepted") {
        cls = "status-accepted";
    }


    if (status === "Shipped") {
        cls = "status-shipped";
    }


    if (
        status ===
        "Out for Delivery"
    ) {
        cls = "status-out";
    }


    if (status === "Delivered") {
        cls = "status-delivered";
    }


    if (status === "Rejected") {
        cls = "status-rejected";
    }


    return `

        <span
            class="status-pill ${cls}"
        >
            ${escapeHtml(status)}
        </span>

    `;

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove("show");

    }


    if (
        !document.querySelector(
            ".bb-modal.show"
        )
    ) {

        document.body.style.overflow = "";

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    const container =
        document.getElementById(
            "toastContainer"
        );


    if (!container) return;


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `bb-toast ${type}`;


    toast.textContent =
        message;


    container.appendChild(
        toast
    );


    setTimeout(() => {

        toast.remove();

    }, 2800);

}


/* =========================================================
   MONEY
========================================================= */

function formatMoney(number) {

    return Number(
        number || 0
    ).toLocaleString(
        "en-IN"
    );

}


/* =========================================================
   DATE
========================================================= */

function formatDate(timestamp) {

    return new Date(
        timestamp
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   ORDER ID
========================================================= */

function generateOrderId() {

    let max =
        10000;


    orders.forEach(order => {

        const match =
            String(
                order.id
            ).match(
                /\d+/
            );


        if (match) {

            max =
                Math.max(
                    max,
                    Number(
                        match[0]
                    )
                );

        }

    });


    return `BB${max + 1}`;

}


/* =========================================================
   CUSTOMER PROFILE
========================================================= */

function ensureCustomerProfile() {

    const profile =
        bbGet(
            BB_KEYS.CUSTOMER,
            null
        );


    if (!profile) {

        bbSet(
            BB_KEYS.CUSTOMER,
            {
                name: "",
                phone: "",
                address: "",
                city: "",
                pincode: ""
            }
        );

    }

}


/* =========================================================
   INPUT HELPERS
========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

}


function setInputValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {
        element.value = value;
    }

}


/* =========================================================
   FALLBACK IMAGE
========================================================= */

function fallbackImage(title) {

    const text =
        String(
            title || "Product"
        )
        .slice(0, 22)
        .replace(
            /[<>&"]/g,
            ""
        );


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="700"
            height="700"
        >

            <rect
                width="100%"
                height="100%"
                fill="#f0ecff"
            />

            <circle
                cx="350"
                cy="270"
                r="90"
                fill="#6c3df4"
                opacity=".15"
            />

            <text
                x="350"
                y="400"
                text-anchor="middle"
                font-family="Arial"
                font-size="28"
                fill="#6c3df4"
            >
                ${text}
            </text>

        </svg>

    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


function escapeAttribute(value) {

    return escapeHtml(value);

}


/* =========================================================
   GLOBALS
========================================================= */

window.closeModal =
    closeModal;

window.renderOrders =
    renderOrders;

window.renderDelivery =
    renderDelivery;

window.showToast =
    showToast;

window.reloadOrders =
    reloadOrders;