# Airbnb Clone – Full Stack Web Application

A full-stack Airbnb-inspired web application built using Node.js, Express.js, and MongoDB that allows users to create, manage, and review property listings with secure authentication and authorization.

---

## Features

* User Signup and Login Authentication
* Authorization with Protected Routes
* Create, Edit, and Delete Listings
* Ownership-based Access Control
* Add and Delete Reviews & Ratings
* Map-based Location Display for Listings
* RESTful API Implementation
* MongoDB Database Integration
* Server-side Rendering using EJS

---

## Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript
* EJS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Tools**

* Mongoose
* Express Session
* Passport.js
* Method Override

---

## Project Description

This project replicates core functionality of Airbnb where users can explore property listings and interact with them securely.

Users can:

* View all property listings
* Add new listings
* Edit or delete listings created by them
* Add reviews and ratings
* Delete reviews created by them
* View listing locations on a map

Authorization logic ensures that only the creator of a listing or review can modify or delete their content.

---

## Authentication & Authorization

* Secure user signup and login system
* Session-based authentication
* Middleware-based route protection
* Ownership verification for listings and reviews

---

## Database

MongoDB is used for persistent storage of:

* Users
* Listings
* Reviews

Relationships are maintained using Mongoose schemas.

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/SANSKRITI01717/vacation-villa
```

Move into project directory:

```bash
cd project-name
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
node app.js
```

Open in browser:

http://localhost:3000

---

## Learning Outcomes

* Built RESTful APIs using Express.js
* Implemented authentication and authorization
* Integrated MongoDB with backend applications
* Applied CRUD operations in real-world project
* Improved backend architecture understanding

---

## Future Improvements


* Booking functionality
* Payment integration
* UI improvements
* Advanced filtering and search

---

## Author

Sanskriti
B.Tech Computer Science and Engineering Student
