/* =========================================================
   BHARATBAZAAR ADMIN SYSTEM
========================================================= */

const BB_ADMIN_USERS = {
    Fashion:{
        email:"fashion@bharatbazaar.com",
        password:"Fashion@123"
    },

    Electronics:{
        email:"electronics@bharatbazaar.com",
        password:"Electronics@123"
    },

    Jewellery:{
        email:"jewellery@bharatbazaar.com",
        password:"Jewellery@123"
    }
};


/* =========================================================
   LOGIN PAGE
========================================================= */

document.addEventListener("DOMContentLoaded",()=>{

    const loginForm=document.getElementById("adminLoginForm");

    if(loginForm){

        loginForm.addEventListener("submit",handleAdminLogin);

        return;
    }

    initializeDepartmentAdmin();
});


function handleAdminLogin(e){

    e.preventDefault();

    const department=
        document.getElementById("adminDepartment").value;

    const email=
        document.getElementById("adminEmail").value.trim();

    const password=
        document.getElementById("adminPassword").value;

    const message=document.getElementById("loginMessage");

    const user=BB_ADMIN_USERS[department];

    if(!user){

        message.innerHTML=`
            <span style="color:#dc3545">
                Please select a department.
            </span>
        `;

        return;
    }

    if(
        email.toLowerCase()!==user.email.toLowerCase() ||
        password!==user.password
    ){

        message.innerHTML=`
            <span style="color:#dc3545">
                Invalid email or password.
            </span>
        `;

        return;
    }

    sessionStorage.setItem(
        "bb_admin_session",
        JSON.stringify({
            department,
            email,
            loginAt:Date.now()
        })
    );

    const target=
        department==="Fashion"
        ? "admin/fashion.html"
        : department==="Electronics"
        ? "admin/electronics.html"
        : "admin/jewellery.html";

    window.location.href=target;
}


/* =========================================================
   DEPARTMENT ADMIN
========================================================= */

function initializeDepartmentAdmin(){

    const session=getAdminSession();

    const pageDepartment=
        document.body.dataset.department;

    if(!session){

        window.location.href="../admin.html";
        return;
    }

    if(session.department!==pageDepartment){

        window.location.href="../admin.html";
        return;
    }

    buildAdminUI(pageDepartment);
    refreshAdmin();
}


function getAdminSession(){

    try{
        return JSON.parse(
            sessionStorage.getItem("bb_admin_session")
        );
    }catch{
        return null;
    }
}


/* =========================================================
   BUILD DASHBOARD
========================================================= */

function buildAdminUI(department){

    document.getElementById("adminDepartmentTitle")
        .textContent=department;

    document.getElementById("adminDepartmentSubtitle")
        .textContent=
        `${department} Department Management`;

    document.getElementById("adminDepartmentIcon")
        .innerHTML=
        department==="Fashion"
        ? '<i class="bi bi-person-standing-dress"></i>'
        : department==="Electronics"
        ? '<i class="bi bi-phone"></i>'
        : '<i class="bi bi-gem"></i>';

}


/* =========================================================
   REFRESH
========================================================= */

function refreshAdmin(){

    const department=
        document.body.dataset.department;

    const products=bbGetProducts()
        .filter(p=>bbGetDepartment(p.category)===department);

    const allOrders=bbGet(BB_KEYS.ORDERS,[]);

    const orderItems=[];

    allOrders.forEach(order=>{

        order.items.forEach(item=>{

            if(bbGetDepartment(item.category)===department){

                orderItems.push({
                    order,
                    item
                });

            }

        });

    });

    renderMetrics(products,orderItems);
    renderInventory(products);
    renderAdminOrders(orderItems);
    renderRejected(orderItems);

}


/* =========================================================
   METRICS
========================================================= */

function renderMetrics(products,items){

    const uniqueOrders=
        new Set(items.map(x=>x.order.id)).size;

    const delivered=
        items.filter(x=>x.item.status==="Delivered");

    const revenue=delivered.reduce(
        (sum,x)=>sum+(x.item.price*x.item.quantity),
        0
    );

    const metrics=[
        ["Total Products",products.length,"bi-box-seam","purple"],
        ["Total Orders",uniqueOrders,"bi-receipt","blue"],
        ["Total Items",items.length,"bi-grid","cyan"],
        ["Pending",countStatus(items,"Pending"),"bi-clock","gray"],
        ["Accepted",countStatus(items,"Accepted"),"bi-check2","blue"],
        ["Shipped",countStatus(items,"Shipped"),"bi-box-arrow-up","indigo"],
        ["Out for Delivery",countStatus(items,"Out for Delivery"),"bi-truck","orange"],
        ["Delivered",countStatus(items,"Delivered"),"bi-house-check","green"],
        ["Rejected",countStatus(items,"Rejected"),"bi-x-circle","red"],
        ["Revenue",`₹${formatAdminMoney(revenue)}`,"bi-currency-rupee","green"]
    ];

    document.getElementById("metricsGrid").innerHTML=
        metrics.map(m=>`

            <div class="metric-card">

                <div class="metric-icon ${m[3]}">
                    <i class="bi ${m[2]}"></i>
                </div>

                <div>
                    <div class="metric-label">${m[0]}</div>
                    <div class="metric-value">${m[1]}</div>
                </div>

            </div>

        `).join("");
}


function countStatus(items,status){

    return items.filter(
        x=>x.item.status===status
    ).length;
}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory(products){

    const box=document.getElementById("inventoryTable");

    if(!products.length){

        box.innerHTML=`
            <div class="admin-empty">
                No products available.
            </div>
        `;

        return;
    }

    box.innerHTML=`

        <div class="table-scroll">

            <table class="admin-table">

                <thead>

                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Seller</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    ${products.map(product=>`

                        <tr>

                            <td>

                                <div class="table-product">

                                    <img
                                        src="${product.image}"
                                        onerror="this.onerror=null;this.src='${adminFallbackImage(product.title)}'"
                                    >

                                    <div>
                                        <strong>
                                            ${escapeAdmin(product.title)}
                                        </strong>

                                        <small>
                                            ${escapeAdmin(product.brand)}
                                        </small>
                                    </div>

                                </div>

                            </td>

                            <td>${escapeAdmin(product.category)}</td>

                            <td>
                                <strong>
                                    ₹${formatAdminMoney(product.price)}
                                </strong>
                            </td>

                            <td>
                                <span class="stock-badge">
                                    ${product.stock}
                                </span>
                            </td>

                            <td>${escapeAdmin(product.seller)}</td>

                            <td>

                                <div class="table-actions">

                                    <button
                                        class="icon-action edit"
                                        onclick="openProductEditor(${product.id})"
                                        title="Edit"
                                    >
                                        <i class="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        class="icon-action delete"
                                        onclick="deleteProduct(${product.id})"
                                        title="Delete"
                                    >
                                        <i class="bi bi-trash"></i>
                                    </button>

                                </div>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================================
   ADMIN ORDERS
========================================================= */

function renderAdminOrders(items){

    const box=document.getElementById("adminOrders");

    if(!items.length){

        box.innerHTML=`
            <div class="admin-empty">
                No department orders yet.
            </div>
        `;

        return;
    }

    box.innerHTML=items.map(({order,item})=>`

        <div class="admin-order-card">

            <div class="admin-order-image">

                <img
                    src="${item.image}"
                    onerror="this.onerror=null;this.src='${adminFallbackImage(item.title)}'"
                >

            </div>

            <div class="admin-order-info">

                <div class="admin-order-title">
                    ${escapeAdmin(item.title)}
                </div>

                <div class="admin-order-meta">
                    Order ${order.id}
                    • ${formatAdminDate(order.createdAt)}
                </div>

                <div class="admin-order-meta">
                    Customer:
                    ${escapeAdmin(order.customer.name)}
                    • Qty ${item.quantity}
                </div>

                <div class="admin-order-meta">
                    Amount:
                    ₹${formatAdminMoney(item.price*item.quantity)}
                </div>

            </div>

            <div class="admin-order-status">
                ${adminStatusPill(item.status)}
            </div>

            <div class="admin-order-actions">

                ${adminActionButtons(order,item)}

            </div>

        </div>

    `).join("");
}


function adminActionButtons(order,item){

    if(item.status==="Pending"){

        return `
            <button
                class="admin-btn accept"
                onclick="updateItemStatus('${order.id}',${item.productId},'Accepted')"
            >
                <i class="bi bi-check-lg"></i>
                Accept
            </button>
        `;
    }

    if(item.status==="Accepted"){

        return `
            <button
                class="admin-btn ship"
                onclick="updateItemStatus('${order.id}',${item.productId},'Shipped')"
            >
                <i class="bi bi-box-seam"></i>
                Ship
            </button>
        `;
    }

    if(item.status==="Shipped"){

        return `
            <button
                class="admin-btn delivery"
                onclick="setOutForDelivery('${order.id}',${item.productId})"
            >
                <i class="bi bi-truck"></i>
                Out for Delivery
            </button>
        `;
    }

    if(item.status==="Out for Delivery"){

        return `
            <span class="admin-hint">
                PIN: <strong>${item.otp||"----"}</strong>
            </span>
        `;
    }

    if(item.status==="Delivered"){

        return `
            <span class="admin-complete">
                <i class="bi bi-check-circle"></i>
                Delivered
            </span>
        `;
    }

    if(item.status==="Rejected"){

        return `
            <button
                class="admin-btn accept"
                onclick="acceptRejectedItem('${order.id}',${item.productId})"
            >
                <i class="bi bi-arrow-counterclockwise"></i>
                Accept Again
            </button>
        `;
    }

    return "";
}


/* =========================================================
   STATUS UPDATE
========================================================= */

window.updateItemStatus=function(orderId,productId,status){

    const orders=bbGet(BB_KEYS.ORDERS,[]);

    const order=orders.find(
        o=>o.id===orderId
    );

    if(!order) return;

    const item=order.items.find(
        i=>String(i.productId)===String(productId)
    );

    if(!item) return;

    item.status=status;

    if(status==="Accepted"){
        item.acceptedAt=Date.now();
    }

    if(status==="Shipped"){
        item.shippedAt=Date.now();
    }

    bbSet(BB_KEYS.ORDERS,orders);

    refreshAdmin();

    showAdminToast(
        `${item.title} moved to ${status}`,
        "success"
    );
};


window.setOutForDelivery=function(orderId,productId){

    const orders=bbGet(BB_KEYS.ORDERS,[]);

    const order=orders.find(
        o=>o.id===orderId
    );

    if(!order) return;

    const item=order.items.find(
        i=>String(i.productId)===String(productId)
    );

    if(!item) return;

    if(item.status!=="Shipped"){

        showAdminToast(
            "Product must be Shipped first.",
            "error"
        );

        return;
    }

    const otp=String(
        Math.floor(1000+Math.random()*9000)
    );

    item.status="Out for Delivery";
    item.otp=otp;
    item.otpVerified=false;
    item.outForDeliveryAt=Date.now();

    bbSet(BB_KEYS.ORDERS,orders);

    refreshAdmin();

    showAdminToast(
        `Delivery PIN generated: ${otp}`,
        "success"
    );
};


/* =========================================================
   REJECTED
========================================================= */

function renderRejected(items){

    const box=document.getElementById("rejectedItems");

    const rejected=items.filter(
        x=>x.item.status==="Rejected"
    );

    if(!rejected.length){

        box.innerHTML=`
            <div class="admin-empty">
                No rejected products.
            </div>
        `;

        return;
    }

    box.innerHTML=rejected.map(({order,item})=>`

        <div class="rejected-card">

            <img
                src="${item.image}"
                onerror="this.onerror=null;this.src='${adminFallbackImage(item.title)}'"
            >

            <div class="rejected-info">

                <strong>
                    ${escapeAdmin(item.title)}
                </strong>

                <small>
                    Order: ${order.id}
                </small>

                <small>
                    Reason:
                    ${escapeAdmin(item.rejectReason||"Not specified")}
                </small>

            </div>

            <button
                class="admin-btn accept"
                onclick="acceptRejectedItem('${order.id}',${item.productId})"
            >
                <i class="bi bi-check-lg"></i>
                Accept
            </button>

        </div>

    `).join("");
}


window.acceptRejectedItem=function(orderId,productId){

    const orders=bbGet(BB_KEYS.ORDERS,[]);

    const order=orders.find(
        o=>o.id===orderId
    );

    if(!order) return;

    const item=order.items.find(
        i=>String(i.productId)===String(productId)
    );

    if(!item) return;

    item.status="Pending";
    item.rejectedAt=null;
    item.rejectReason="";
    item.otp=null;
    item.otpVerified=false;

    bbSet(BB_KEYS.ORDERS,orders);

    refreshAdmin();

    showAdminToast(
        "Rejected product accepted again and moved to Pending.",
        "success"
    );
};


/* =========================================================
   PRODUCT CRUD
========================================================= */

let editingProductId=null;

window.openProductEditor=function(productId=null){

    editingProductId=productId;

    const modal=document.getElementById("productEditorModal");

    const title=document.getElementById("productEditorTitle");

    if(productId){

        const product=bbGetProductById(productId);

        if(!product) return;

        title.textContent="Edit Product";

        document.getElementById("pTitle").value=product.title;
        document.getElementById("pCategory").value=product.category;
        document.getElementById("pPrice").value=product.price;
        document.getElementById("pOriginalPrice").value=product.originalPrice;
        document.getElementById("pRating").value=product.rating;
        document.getElementById("pReviews").value=product.reviews;
        document.getElementById("pImage").value=product.image;
        document.getElementById("pStock").value=product.stock;
        document.getElementById("pBrand").value=product.brand;
        document.getElementById("pSeller").value=product.seller;
        document.getElementById("pDescription").value=product.description;

    }else{

        title.textContent="Add Product";

        document.getElementById("productForm").reset();

        document.getElementById("pCategory").value=
            document.body.dataset.department;
    }

    modal.classList.add("show");
};


function saveProduct(e){

    e.preventDefault();

    const department=
        document.body.dataset.department;

    const product={

        id:editingProductId || Date.now(),

        title:document.getElementById("pTitle").value.trim(),

        category:document.getElementById("pCategory").value,

        price:Number(document.getElementById("pPrice").value),

        originalPrice:Number(
            document.getElementById("pOriginalPrice").value
        ),

        rating:Number(
            document.getElementById("pRating").value
        ),

        reviews:Number(
            document.getElementById("pReviews").value
        ),

        image:document.getElementById("pImage").value.trim(),

        stock:Number(
            document.getElementById("pStock").value
        ),

        brand:document.getElementById("pBrand").value.trim(),

        seller:document.getElementById("pSeller").value.trim(),

        description:
            document.getElementById("pDescription").value.trim()

    };

    if(bbGetDepartment(product.category)!==department){

        showAdminToast(
            `This page can only manage ${department} products.`,
            "error"
        );

        return;
    }

    const adminProducts=bbGet(
        BB_KEYS.ADMIN_PRODUCTS,
        []
    );

    const index=adminProducts.findIndex(
        p=>String(p.id)===String(product.id)
    );

    if(index===-1){
        adminProducts.push(product);
    }else{
        adminProducts[index]=product;
    }

    bbSet(
        BB_KEYS.ADMIN_PRODUCTS,
        adminProducts
    );

    const deleted=bbGet(
        BB_KEYS.DELETED_PRODUCTS,
        []
    ).filter(
        id=>String(id)!==String(product.id)
    );

    bbSet(BB_KEYS.DELETED_PRODUCTS,deleted);

    closeAdminModal("productEditorModal");

    refreshAdmin();

    showAdminToast(
        editingProductId
        ? "Product updated successfully."
        : "Product added successfully.",
        "success"
    );
}


window.deleteProduct=function(productId){

    const product=bbGetProductById(productId);

    if(!product) return;

    if(
        !confirm(
            `Delete "${product.title}" from the store?`
        )
    ){
        return;
    }

    const adminProducts=bbGet(
        BB_KEYS.ADMIN_PRODUCTS,
        []
    );

    const filtered=adminProducts.filter(
        p=>String(p.id)!==String(productId)
    );

    bbSet(
        BB_KEYS.ADMIN_PRODUCTS,
        filtered
    );

    const deleted=bbGet(
        BB_KEYS.DELETED_PRODUCTS,
        []
    );

    if(!deleted.includes(productId)){
        deleted.push(productId);
    }

    bbSet(
        BB_KEYS.DELETED_PRODUCTS,
        deleted
    );

    refreshAdmin();

    showAdminToast(
        "Product deleted.",
        "success"
    );
};


/* =========================================================
   LOGOUT
========================================================= */

window.adminLogout=function(){

    sessionStorage.removeItem("bb_admin_session");

    window.location.href="../admin.html";
};


/* =========================================================
   MODAL
========================================================= */

function closeAdminModal(id){

    const modal=document.getElementById(id);

    if(modal){
        modal.classList.remove("show");
    }
}


document.addEventListener("click",e=>{

    if(e.target.matches("[data-admin-close]")){

        closeAdminModal(
            e.target.dataset.adminClose
        );

    }

});


/* =========================================================
   TOAST
========================================================= */

function showAdminToast(message,type="success"){

    const container=document.getElementById(
        "adminToastContainer"
    );

    if(!container) return;

    const toast=document.createElement("div");

    toast.className=
        `admin-toast ${type}`;

    toast.textContent=message;

    container.appendChild(toast);

    setTimeout(()=>{
        toast.remove();
    },3000);
}


/* =========================================================
   HELPERS
========================================================= */

function adminStatusPill(status){

    const classes={
        Pending:"pending",
        Accepted:"accepted",
        Shipped:"shipped",
        "Out for Delivery":"out",
        Delivered:"delivered",
        Rejected:"rejected"
    };

    return `
        <span class="admin-status ${classes[status]||"pending"}">
            ${escapeAdmin(status)}
        </span>
    `;
}


function formatAdminMoney(value){

    return Number(value).toLocaleString("en-IN");
}


function formatAdminDate(value){

    return new Date(value).toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );
}


function escapeAdmin(value){

    return String(value??"")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


function adminFallbackImage(title){

    const text=String(title||"Product")
        .slice(0,18)
        .replace(/[<>&"]/g,"");

    const svg=`
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
            <rect width="100%" height="100%" fill="#f0ebff"/>
            <circle cx="250" cy="210" r="70" fill="#6c3df4" opacity=".15"/>
            <text x="250" y="330"
                text-anchor="middle"
                font-family="Arial"
                font-size="23"
                fill="#6c3df4">
                ${text}
            </text>
        </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8,"+
        encodeURIComponent(svg);
}


/* =========================================================
   EXPORT GLOBALS
========================================================= */

window.refreshAdmin=refreshAdmin;
window.saveProduct=saveProduct;
window.closeAdminModal=closeAdminModal;