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





## Landing Page

The landing page is the first page users see when they open the SilverStar Parts Hub website. Its purpose is to introduce the company, present the brand identity, and guide users toward browsing Mercedes-Benz car parts.  

For this page, I used the **Editorial template by HTML5 UP** as the base layout and then customized it to fit the project theme, branding, images, navigation, and content related to Mercedes-Benz parts. The template provided a responsive structure, while the project-specific modifications focused on creating a professional e-commerce landing page for **SilverStar Parts**.

### Template Used

- **Template Name:** Editorial
- **Source:** HTML5 UP
- **Purpose of using template:** To provide a responsive and modern UI foundation which I then adapted for my own e-commerce project.

---

### 1. Basic Page Structure

The landing page begins with the standard HTML document structure. It also links the external stylesheet from the template.

```html
<!DOCTYPE HTML>
<html>
	<head>
		<title>SilverStar Parts</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
	</head>
	<body class="is-preload">

```

### 2. Wrapper and Main Layout

The template organizes the page using a wrapper, a main content area, and a sidebar.

```html
<div id="wrapper">

	<div id="main">
		<div class="inner">

```

**Explanation**

* `wrapper` contains entire layout
* `main` contains page content
* `inner` provides spacing and alignment

---

### 3.Original Parts Section

This section presents the first main product category: original Mercedes-Benz parts.

```html
<section id="original-parts">
	<header class="major">
		<h2>Original Parts</h2>
	</header>
	<div class="original-intro">
		<p>
			We provide a wide range of genuine and high-quality original car parts designed to ensure reliability, safety, and optimal vehicle performance. Our products come from trusted manufacturers and meet the highest industry standards to keep your vehicle running smoothly.
		</p>
	</div>

```

**Explanation**

* Presents genuine Mercedes Benz parts
* Builds trust with customers
* Linked from banner "Learn More" button

---

### 4.Feature Cards for Original Parts

Inside the original parts section, feature cards are used to present different product categories.

Example: Brake System Components

```html
<article>
	<span class="icon part-icon">
		<img src="images/brakes.png" alt="Brake Pad">
	</span>
	<div class="content">
		<h3>Brake System Components</h3>
		<p>Our brake system components are designed to ensure maximum safety, reliability, and stopping performance for your vehicle. At SilverStar Parts, we supply high-quality brake pads, brake discs, calipers, sensors, and related components that meet strict automotive standards. Each product is selected to provide consistent braking efficiency, durability, and optimal performance, helping drivers maintain full control and confidence on the road.Example parts we offer:
			<ul>
				<li>Brake pads</li>
				<li>Brake discs</li>
				<li>Brake calipers</li>
				<li>Brake sensors</li>
			</ul>
		</p>
	</div>
</article>

```

**Explanation**

* Each article represents product category
* Image used as icon
* Title describes part category
* List shows example products
* Card layout improves readability

---



### 5.Pre-Owned Parts Section

The pre-owned section promotes budget-friendly used Mercedes-Benz parts.

```html
<section class="preowned-section">
	<header class="major">
		<h2>Pre-owned Car Parts</h2>
	</header>

	<div class="preowned-banner">
		<div class="preowned-banner-text">
			<h2>Quality Parts That Fit Your Budget</h2>
			<p>
				At SilverStar Parts, we offer carefully inspected pre-owned Mercedes-Benz components for customers who want dependable performance at a lower cost.
			</p>
			<a href="#preowned-items" class="preowned-link">Explore Pre-Owned Parts →</a>
		</div>

		<div class="preowned-banner-images">
			<img src="images/imagenew.png" alt="">
			<img src="images/face.png" alt="">
		</div>
	</div>

```

**Explanation**

* Shows affordable alternative parts
* Helps budget-conscious customers
* Separate section improves organization

---


### 6.Sidebar Search Bar

The sidebar includes a search field that supports the product search functionality of the project.

The search field allows users to enter a keyword when looking for a product.
It is placed in the sidebar so that it remains easily accessible.
The input field is part of the user interface and can later be connected to backend product search logic.
Including search functionality is important because it improves usability in an e-commerce system.

```html
<section id="search" class="alt">
	<form method="post" action="#">
		<input type="text" name="query" id="query" placeholder="Search" />
	</form>
</section>

```

---

### 8. Navigation Menu

```html
<nav id="menu">
    <ul>
        <li><a href="index.html">Homepage</a></li>
        <li><a href="generic.html">Products</a></li>
        <li><a href="addproduct.html">Add Product</a></li>
        <li><a href="orderhistory.html">Order History</a></li>
        <li>
            <a href="cart.html">
                Cart
                <span id="cartCountBadge">0</span>
            </a>
        </li>
    </ul>
</nav>
```

**Explanation**

* Provides navigation to main pages
* Includes cart link
* Cart badge displays item count

---

### 9. Search Bar

```html
<input type="text" name="query" id="query" placeholder="Search" />
```

**Explanation**

* Allows users to search products
* Improves usability
* Can be connected to backend search

---

### 10. Cart Badge JavaScript

```javascript
function updateCartBadge() {
  const badge = document.getElementById("cartCountBadge");
  if (!badge) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = 0;
  cart.forEach(item => {
    count += Number(item.quantity || 1);
  });

  badge.textContent = count;
}

updateCartBadge();
window.updateCartBadge = updateCartBadge;
```

**Explanation**

* Retrieves cart from localStorage
* Calculates total items
* Updates cart badge
* Improves shopping experience

---

### Landing Page Summary

The landing page was customized from the HTML5 UP Editorial template.
It introduces the SilverStar Parts brand, displays original and pre-owned Mercedes Benz components, and provides navigation to the rest of the application.
The page also includes search functionality and a dynamic cart badge to improve usability.


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
```















