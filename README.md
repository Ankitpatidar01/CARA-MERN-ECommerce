# 🛍️ CARA - Production Ready MERN E-Commerce Website

A full-stack production-ready E-Commerce web application built using the MERN Stack.

This project was developed to learn real-world backend development, authentication, payment integration, and scalable REST API architecture.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-based Authentication (Admin/User)

### Shopping
- Browse Products
- Product Categories
- Featured Products
- New Arrivals

### Cart
- User-specific Shopping Cart
- Update Quantity
- Remove Product
- Clear Cart
- Dynamic Cart Count

### Payment
- Razorpay Payment Gateway
- Secure Payment Verification
- Payment Signature Verification

### Orders
- User-specific Orders
- Automatic Order Creation after Payment
- Cart Auto Clear after Successful Order
- Order Status Management

### Admin
- Add Product
- Edit Product
- Delete Product
- Product Management Dashboard

### Responsive Design
- Desktop
- Tablet
- Mobile Friendly

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### Payment

- Razorpay

### Tools

- Git
- GitHub
- Postman
- MongoDB Compass

---

## 📁 Project Structure

```
CARA-MERN-ECommerce

├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── css
│   ├── js
│   ├── image
│   ├── index.html
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/CARA-MERN-ECommerce.git
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

Open

```
index.html
```

using Live Server.

---

## 🔑 Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=5050

MONGODB_URI=mongodb://localhost:27017/CARA

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

RAZORPAY_KEY_ID=your_key

RAZORPAY_SECRET=your_secret
```

---

## 📌 API Endpoints

### Authentication

```
POST /api/auth/register

POST /api/auth/login
```

### Products

```
GET /products

POST /products

PUT /products/:id

DELETE /products/:id
```

### Cart

```
GET /carts

POST /carts

PUT /carts/:id

DELETE /carts/:id
```

### Payment

```
POST /payment

POST /payment/verify
```

### Orders

```
POST /orders

GET /orders
```

---

## 🎯 Future Enhancements

- Wishlist
- Product Search
- Filters
- User Profile
- Address Management
- Order Tracking
- Reviews & Ratings
- Email Notifications
- Admin Dashboard Analytics
- Deployment on Render & Vercel

---

## 📷 Screenshots

Add screenshots here after deployment.

Example:

- Home Page
- Login Page
- Shopping Cart
- Checkout
- Orders
- Admin Dashboard

---

## 👨‍💻 Author

**Ankit Patidar**

MCA Student

National Institute of Technology Warangal

GitHub:
https://github.com/Ankitpatidar01

---

## ⭐ If you like this project

Give it a ⭐ on GitHub.
