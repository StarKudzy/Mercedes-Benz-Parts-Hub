# Mercedes Benz Car Parts Hub - SilverStar

## Project Overview

**Mercedes Benz Car Parts Hub - SilverStar** is a full-stack e-commerce web application developed for selling Mercedes Benz car parts online. The platform allows users to browse available parts, search for products, view detailed product information, add new products, simulate payments using PayPal Sandbox, and review order history: The system demonstrates both front-end and back-end development concepts, including RESTful API design, database integration, and payment simulation. 

---

## Company Name

**SilverStar**

---

## Project Objectives

The main objective of this project is to build a simple and functional online shop for Mercedes Benz car parts. The application was designed to meet the following requirements:

- Create an attractive landing page for the company
- Display all products in a product listing page
- Allow users to click products to view more details
- Provide functionality to add a new product
- Enable product search by name
- Simulate online payments using PayPal Sandbox
- Store and display order history



---

## Features

- Responsive landing page
- Product listing page
- Product details page
- Add new product page
- Search products by name
- PayPal Sandbox payment integration
- Order history page
- REST API for products and orders
- MongoDB database integration

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- SCSS


### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Payment Integration
- PayPal Sandbox

### Version Control
- Git and GitHub

---

## Screenshots



### Landing Page
![Landing Page](./screenshots/landing-page.png)

### Product Listing Page
![Product Listing](./screenshots/product-list.png)

### Product Details Page
![Product Details](./screenshots/product-details.png)

### Add Product Page
![Add Product](./screenshots/add-product.png)

### Search Functionality
![Search Products](./screenshots/search-product.png)

### PayPal Payment Page
![PayPal Payment](./screenshots/payment-page.png)

### Order History Page
![Order History](./screenshots/order-history.png)

---

## System Architecture

The application follows a typical full-stack web application structure:

- **Frontend** handles the user interface and user interaction
- **Backend** handles API requests, business logic, and communication with the database
- **MongoDB** stores product and order data
- **PayPal Sandbox** simulates the payment process

---

## Project Structure

```bash
Mercedes-Benz-Car-Parts-Hub/
│
├── client/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── scripts/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── screenshots/
├── .env
├── package.json
└── README.md