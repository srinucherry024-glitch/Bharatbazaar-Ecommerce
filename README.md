# BharatBazaar E-commerce Website

BharatBazaar is a frontend e-commerce website inspired by Indian online shopping platforms. It provides a customer shopping experience along with department-specific admin dashboards for Fashion, Electronics, and Jewellery.

## Features

### Customer experience

- Browse products by category
- Search products by name and details
- View product prices, discounts, ratings, and reviews
- Add products to a cart
- Add products to a wishlist
- Checkout with delivery details
- View orders and delivery status
- Persist cart, wishlist, orders, and customer data with browser `localStorage`
- Responsive layout for desktop and mobile screens

### Admin experience

- Admin login by department
- Fashion, Electronics, and Jewellery dashboards
- View inventory and order metrics
- Manage products and stock
- Review order status and revenue information
- Store admin changes in browser storage for the current browser

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Bootstrap Icons
- Browser `localStorage` and `sessionStorage`

## Project Structure

```text
meesho-clone/
├── index.html                 # Customer storefront
├── admin.html                 # Admin login page
├── admin/
│   ├── fashion.html           # Fashion dashboard
│   ├── electronics.html       # Electronics dashboard
│   └── jewellery.html         # Jewellery dashboard
├── css/
│   └── style.css              # Shared styles
├── images/                    # Local product images
└── js/
    ├── data.js                # Product data and storage helpers
    ├── app.js                 # Customer shopping functionality
    └── admin.js               # Admin functionality
```

## How to Run

No build tools or package installation are required.

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser.

For the best local development experience, use the VS Code **Live Server** extension and open `index.html` with **Open with Live Server**.

## Demo Admin Login

Open `admin.html` and use one of these department accounts:

| Department  | Email                          | Password          |
| ----------- | ------------------------------ | ----------------- |
| Fashion     | `fashion@bharatbazaar.com`     | `Fashion@123`     |
| Electronics | `electronics@bharatbazaar.com` | `Electronics@123` |
| Jewellery   | `jewellery@bharatbazaar.com`   | `Jewellery@123`   |

## Important Notes

- This project is a frontend demo and does not use a backend or database.
- Customer and admin data is stored only in the browser's local storage and session storage.
- Product images are loaded from local files and external image URLs.
- Clearing browser storage resets cart, wishlist, orders, and admin product changes.

## Future Improvements

- Add a backend API and database
- Add real user authentication
- Add payment gateway integration
- Add server-side product and order management
- Add automated tests
