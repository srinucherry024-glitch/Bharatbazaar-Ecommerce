/* =========================================================
   BHARATBAZAAR DATA
========================================================= */

const BB_CATEGORIES = [
    "All",
    "Fashion",
    "Electronics",
    "Home & Kitchen",
    "Beauty",
    "Footwear",
    "Jewellery"
];

const IMG = {
    fashion: [
       "images/rishi.png",
       "https://rukminim2.flixcart.com/image/480/640/xif0q/ethnic-set/k/q/v/m-roman-silk-tasrika-original-imahy5gm9ukeqzy8.jpeg?q=90",
      "https://jaipuristitch.com/cdn/shop/files/SKYBLUELEHARIYA.png?v=1773155951",
        "https://images.cbazaar.com/images/green-cotton-embroidered-mirror-embossed-simple-kurti-for-women-krsacy7433-u.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8enwA36Pfyj3USI6lG7c3RtTaAs1g7Ia7DZcBhvN3OBrbpaRJX2UtPYE&s=10",
        "images/Rishi2.png",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1585488431146-6e7f3c3c5e99?auto=format&fit=crop&w=700&q=80"
    ],

    electronics: [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80"
    ],

    home: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1583845112203-454c3b4c4a0c?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80"
    ],

    beauty: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80"
    ],

    footwear: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80"
    ],

    jewellery: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80"
    ]
};

function makeProduct(
    id,
    title,
    category,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    brand,
    description,
    seller
){
    return {
        id,
        title,
        category,
        price,
        originalPrice,
        rating,
        reviews,
        image,
        stock: 25 + (id % 40),
        brand,
        description,
        seller
    };
}

const BB_PRODUCTS = [

/* ================= FASHION ================= */

makeProduct(1,"Rishi's Printed Kanjivaram Silk Saree","Fashion",899,2499,5.0,11240,IMG.fashion[0],"Bharat Silks","Elegant traditional saree with rich printed patterns and comfortable fabric.","Bharat Fashion House"),
makeProduct(2,"Women's Embroidered Anarkali Kurti","Fashion",699,1899,4.4,876,IMG.fashion[1],"Ethnic Aura","Beautiful embroidered kurti for festive and casual occasions.","Ethnic Aura"),
makeProduct(3,"Men's Premium Cotton Shirt","Fashion",499,1299,4.2,645,IMG.fashion[2],"Urban Wear","Soft premium cotton shirt with modern regular fit.","Urban Wear India"),
makeProduct(4,"Women's Casual Printed Kurta","Fashion",449,1199,4.1,532,IMG.fashion[3],"Style Studio","Comfortable everyday printed kurta with a stylish silhouette.","Style Studio"),
makeProduct(5,"Men's Slim Fit Denim Jacket","Fashion",899,2199,4.5,921,IMG.fashion[4],"Denim Club","Classic denim jacket suitable for casual outfits.","Denim Club"),
makeProduct(6,"Women's Glasses","Fashion",999,2499,5.0,7014,IMG.fashion[5],"Fashionista","Trendy party dress designed for a flattering fit.","Fashionista"),
makeProduct(7,"Women's Blouse","Fashion",749,1799,4.9,455,IMG.fashion[0],"Royal Ethnic","Traditional kurta pajama set with comfortable fabric.","Royal Ethnic"),
makeProduct(8,"Women's Cotton Palazzo Set","Fashion",649,1499,4.2,611,IMG.fashion[1],"Comfort Lane","Soft cotton palazzo set for daily wear.","Comfort Lane"),
makeProduct(9,"Men's Casual Hoodie","Fashion",599,1399,4.3,827,IMG.fashion[2],"Street Nation","Warm casual hoodie with relaxed fit.","Street Nation"),
makeProduct(10,"Women's Designer Dupatta","Fashion",299,799,4.0,321,IMG.fashion[3],"Ethnic Aura","Lightweight designer dupatta for ethnic styling.","Ethnic Aura"),

/* ================= ELECTRONICS ================= */

makeProduct(11,"Wireless Bluetooth Headphones","Electronics",1299,2999,4.4,2180,IMG.electronics[0],"SoundMax","Wireless over-ear headphones with deep bass and long battery life.","SoundMax India"),
makeProduct(12,"Smartphone 6GB RAM 128GB","Electronics",12999,16999,4.3,1540,IMG.electronics[1],"Bharat Mobile","Powerful smartphone with bright display and reliable performance.","Bharat Mobile"),
makeProduct(13,"True Wireless Earbuds","Electronics",899,2499,4.2,3460,IMG.electronics[2],"AudioBeat","Compact earbuds with clear sound and charging case.","AudioBeat"),
makeProduct(14,"Smart Watch Pro","Electronics",1599,3999,4.1,1920,IMG.electronics[3],"TechFit","Smart watch with activity tracking, notifications and multiple modes.","TechFit"),
makeProduct(15,"Portable Bluetooth Speaker","Electronics",1099,2499,4.5,1124,IMG.electronics[4],"BassBox","Portable speaker with punchy sound and compact design.","BassBox"),
makeProduct(16,"USB-C Fast Charger 33W","Electronics",549,999,4.4,2780,IMG.electronics[5],"ChargePro","Fast charging adapter with USB-C compatibility.","ChargePro"),
makeProduct(17,"Wireless Computer Mouse","Electronics",399,799,4.3,3210,IMG.electronics[0],"ClickTech","Ergonomic wireless mouse for office and home use.","ClickTech"),
makeProduct(18,"Mechanical Gaming Keyboard","Electronics",1899,3499,4.6,897,IMG.electronics[1],"GameCore","RGB mechanical keyboard designed for gaming and productivity.","GameCore"),
makeProduct(19,"Laptop Stand Adjustable","Electronics",699,1299,4.5,1167,IMG.electronics[2],"DeskPro","Adjustable aluminium laptop stand for comfortable working.","DeskPro"),
makeProduct(20,"Power Bank 20000mAh","Electronics",1399,2499,4.2,2045,IMG.electronics[3],"PowerGo","High capacity power bank with fast charging support.","PowerGo"),

/* ================= HOME & KITCHEN ================= */

makeProduct(21,"Modern Table Lamp","Home & Kitchen",699,1499,4.4,532,IMG.home[0],"HomeGlow","Minimal table lamp suitable for bedrooms and study tables.","HomeGlow"),
makeProduct(22,"Non Stick Cookware Set","Home & Kitchen",1799,3499,4.5,1180,IMG.home[1],"KitchenPro","Multi-piece non-stick cookware set for everyday cooking.","KitchenPro"),
makeProduct(23,"Decorative Wall Mirror","Home & Kitchen",899,1999,4.2,420,IMG.home[2],"Decor Nest","Elegant wall mirror with a modern decorative frame.","Decor Nest"),
makeProduct(24,"Modern Lounge Chair","Home & Kitchen",4999,8999,4.5,211,IMG.home[3],"Casa Living","Comfortable lounge chair with modern styling.","Casa Living"),
makeProduct(25,"Wooden Study Chair","Home & Kitchen",2199,3999,4.3,338,IMG.home[4],"WoodCraft","Strong wooden chair designed for study and work.","WoodCraft"),
makeProduct(26,"Indoor Decorative Plant Pot","Home & Kitchen",349,699,4.1,821,IMG.home[5],"Green Home","Decorative pot for indoor plants and home styling.","Green Home"),
makeProduct(27,"Kitchen Storage Container Set","Home & Kitchen",599,1199,4.4,932,IMG.home[1],"KitchenPro","Airtight storage containers for organised kitchens.","KitchenPro"),
makeProduct(28,"Cotton Cushion Covers","Home & Kitchen",299,599,4.0,516,IMG.home[3],"Casa Living","Soft decorative cushion covers for modern interiors.","Casa Living"),
makeProduct(29,"Stainless Steel Water Bottle","Home & Kitchen",449,899,4.3,1520,IMG.home[4],"DailySteel","Durable stainless steel bottle for daily use.","DailySteel"),
makeProduct(30,"Electric Kettle 1.5L","Home & Kitchen",899,1699,4.2,810,IMG.home[2],"KitchenPro","Quick boiling electric kettle with automatic shut-off.","KitchenPro"),

/* ================= BEAUTY ================= */

makeProduct(31,"Vitamin C Face Serum","Beauty",399,899,4.4,2310,IMG.beauty[0],"GlowCare","Lightweight vitamin C serum for a fresh-looking skin routine.","GlowCare"),
makeProduct(32,"Hydrating Face Moisturizer","Beauty",349,699,4.3,1760,IMG.beauty[1],"PureSkin","Daily hydrating moisturiser with lightweight texture.","PureSkin"),
makeProduct(33,"Makeup Brush Set","Beauty",499,999,4.5,1450,IMG.beauty[2],"BeautyPro","Professional style makeup brushes for everyday use.","BeautyPro"),
makeProduct(34,"Matte Lipstick Set","Beauty",599,1199,4.2,1980,IMG.beauty[3],"ColorMuse","Long lasting matte lipstick collection.","ColorMuse"),
makeProduct(35,"Aloe Vera Skin Gel","Beauty",249,499,4.4,2670,IMG.beauty[4],"NatureGlow","Refreshing aloe vera gel for daily skincare.","NatureGlow"),
makeProduct(36,"Hair Care Gift Kit","Beauty",799,1599,4.1,610,IMG.beauty[5],"HairBloom","Complete hair care kit for daily grooming.","HairBloom"),
makeProduct(37,"Face Wash Combo","Beauty",399,799,4.3,1120,IMG.beauty[0],"PureSkin","Gentle face wash combo for everyday cleansing.","PureSkin"),
makeProduct(38,"Perfume Eau De Parfum","Beauty",899,1999,4.4,742,IMG.beauty[1],"Aroma House","Elegant long-lasting fragrance for everyday occasions.","Aroma House"),
makeProduct(39,"Compact Makeup Powder","Beauty",299,599,4.0,854,IMG.beauty[2],"ColorMuse","Smooth compact powder for a clean finish.","ColorMuse"),
makeProduct(40,"Hair Styling Comb Set","Beauty",199,399,4.1,521,IMG.beauty[4],"HairBloom","Useful styling comb set for everyday grooming.","HairBloom"),

/* ================= FOOTWEAR ================= */

makeProduct(41,"Men's Running Shoes","Footwear",1199,2499,4.4,2180,IMG.footwear[0],"RunX","Lightweight running shoes with cushioned sole.","RunX"),
makeProduct(42,"Women's Casual Sneakers","Footwear",999,2199,4.3,1680,IMG.footwear[1],"StepUp","Comfortable sneakers for casual daily wear.","StepUp"),
makeProduct(43,"Men's Formal Shoes","Footwear",1299,2699,4.2,940,IMG.footwear[2],"ClassicStep","Classic formal shoes suitable for office and events.","ClassicStep"),
makeProduct(44,"Women's Flat Sandals","Footwear",499,999,4.1,1250,IMG.footwear[3],"WalkEasy","Comfortable everyday flat sandals.","WalkEasy"),
makeProduct(45,"Men's Casual Sneakers","Footwear",899,1899,4.4,1420,IMG.footwear[4],"StreetStep","Trendy casual sneakers with cushioned sole.","StreetStep"),
makeProduct(46,"Women's Sports Shoes","Footwear",1099,2399,4.5,890,IMG.footwear[5],"FitWalk","Sports shoes with breathable upper and soft sole.","FitWalk"),
makeProduct(47,"Men's Slippers","Footwear",299,599,4.0,3120,IMG.footwear[0],"ComfortStep","Soft daily-use slippers.","ComfortStep"),
makeProduct(48,"Women's Wedge Sandals","Footwear",699,1399,4.2,730,IMG.footwear[3],"WalkEasy","Stylish wedge sandals with comfortable fit.","WalkEasy"),
makeProduct(49,"Kids Casual Shoes","Footwear",599,1199,4.3,512,IMG.footwear[2],"TinySteps","Comfortable casual shoes for children.","TinySteps"),
makeProduct(50,"Men's Canvas Shoes","Footwear",749,1499,4.1,680,IMG.footwear[4],"StreetStep","Lightweight canvas shoes for everyday outfits.","StreetStep"),

/* ================= JEWELLERY ================= */

makeProduct(51,"Gold Plated Necklace Set","Jewellery",899,1999,4.5,1450,IMG.jewellery[0],"Royal Jewels","Elegant gold plated necklace set for festive occasions.","Royal Jewels"),
makeProduct(52,"Oxidised Silver Earrings","Jewellery",299,699,4.3,1870,IMG.jewellery[1],"Silver Story","Trendy oxidised earrings with traditional styling.","Silver Story"),
makeProduct(53,"Designer Bracelet","Jewellery",399,899,4.2,810,IMG.jewellery[2],"Charm House","Elegant bracelet suitable for everyday and party wear.","Charm House"),
makeProduct(54,"Artificial Pearl Necklace","Jewellery",599,1299,4.4,620,IMG.jewellery[3],"Pearl Queen","Classic artificial pearl necklace with elegant finish.","Pearl Queen"),
makeProduct(55,"Gold Plated Bangles","Jewellery",749,1599,4.3,1050,IMG.jewellery[4],"Royal Jewels","Beautiful gold plated bangle set.","Royal Jewels"),
makeProduct(56,"Stone Studded Ring","Jewellery",349,799,4.1,742,IMG.jewellery[5],"Charm House","Stylish stone studded ring with adjustable fit.","Charm House"),
makeProduct(57,"Traditional Jhumka Earrings","Jewellery",499,999,4.5,1640,IMG.jewellery[0],"Ethnic Jewels","Traditional jhumka earrings for festive styling.","Ethnic Jewels"),
makeProduct(58,"Minimal Chain Pendant","Jewellery",449,899,4.2,540,IMG.jewellery[1],"Silver Story","Minimal pendant chain for everyday wear.","Silver Story"),
makeProduct(59,"Charm Anklet Pair","Jewellery",399,799,4.3,680,IMG.jewellery[2],"Charm House","Elegant charm anklet pair with modern details.","Charm House"),
makeProduct(60,"Bridal Jewellery Combo","Jewellery",1499,2999,4.6,430,IMG.jewellery[4],"Royal Jewels","Complete artificial bridal jewellery combination.","Royal Jewels")
];


/* =========================================================
   STORAGE HELPERS
========================================================= */

const BB_KEYS = {
    CART: "bb_cart",
    WISHLIST: "bb_wishlist",
    ORDERS: "bb_orders",
    ADMIN_PRODUCTS: "bb_admin_products",
    DELETED_PRODUCTS: "bb_deleted_products",
    CUSTOMER: "bb_customer_profile"
};

function bbGet(key, fallback){
    try{
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    }catch{
        return fallback;
    }
}

function bbSet(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}


/* =========================================================
   PRODUCT MERGE
========================================================= */

function bbGetProducts(){

    const adminProducts = bbGet(BB_KEYS.ADMIN_PRODUCTS,[]);
    const deleted = bbGet(BB_KEYS.DELETED_PRODUCTS,[]);

    const map = new Map();

    BB_PRODUCTS.forEach(product => {
        map.set(String(product.id),product);
    });

    adminProducts.forEach(product => {
        map.set(String(product.id),product);
    });

    deleted.forEach(id => {
        map.delete(String(id));
    });

    return Array.from(map.values());
}

function bbGetProductById(id){
    return bbGetProducts().find(p => String(p.id) === String(id));
}

function bbGetDepartment(category){

    if(category === "Fashion") return "Fashion";
    if(category === "Electronics") return "Electronics";
    if(category === "Jewellery") return "Jewellery";

    return category;
}

function bbDiscount(product){

    if(!product.originalPrice || product.originalPrice <= product.price){
        return 0;
    }

    return Math.round(
        ((product.originalPrice-product.price)/product.originalPrice)*100
    );
}


/* =========================================================
   DEMO ORDERS
========================================================= */

function makeDemoItem(productId,status,otp=null){

    const product = BB_PRODUCTS.find(p => p.id === productId);

    if(!product) return null;

    return {
        productId:product.id,
        title:product.title,
        category:product.category,
        price:product.price,
        quantity:1,
        image:product.image,
        status,
        otp,
        otpVerified:status === "Delivered",
        acceptedAt:status !== "Pending" ? Date.now()-7200000 : null,
        shippedAt:["Shipped","Out for Delivery","Delivered"].includes(status) ? Date.now()-3600000 : null,
        outForDeliveryAt:["Out for Delivery","Delivered"].includes(status) ? Date.now()-1800000 : null,
        deliveredAt:status === "Delivered" ? Date.now()-900000 : null,
        rejectedAt:null,
        rejectReason:""
    };
}

const BB_DEMO_ORDERS = [
    {
        id:"BB10001",
        createdAt:Date.now()-86400000,
        customer:{
            name:"Demo Customer",
            phone:"9876543210",
            address:"Main Road",
            city:"Vijayawada",
            pincode:"520001"
        },
        payment:"COD",
        items:[
            makeDemoItem(2,"Delivered"),
            makeDemoItem(11,"Out for Delivery","4827"),
            makeDemoItem(51,"Accepted"),
            makeDemoItem(21,"Shipped")
        ]
    },
    {
        id:"BB10002",
        createdAt:Date.now()-43200000,
        customer:{
            name:"Demo Customer",
            phone:"9876543210",
            address:"MG Road",
            city:"Vijayawada",
            pincode:"520010"
        },
        payment:"UPI",
        items:[
            makeDemoItem(5,"Rejected"),
            makeDemoItem(17,"Pending"),
            makeDemoItem(57,"Pending")
        ]
    }
];

window.BB_CATEGORIES = BB_CATEGORIES;
window.BB_PRODUCTS = BB_PRODUCTS;
window.BB_DEMO_ORDERS = BB_DEMO_ORDERS;
window.BB_KEYS = BB_KEYS;
window.bbGet = bbGet;
window.bbSet = bbSet;
window.bbGetProducts = bbGetProducts;
window.bbGetProductById = bbGetProductById;
window.bbGetDepartment = bbGetDepartment;
window.bbDiscount = bbDiscount;