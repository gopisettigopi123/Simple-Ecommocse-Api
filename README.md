# Simple-Ecommocse-Api
A simple Ecommorce web application for both admin and customer ,Have been add products to carts and order from cart and perform CRUD operations on it.
1.Go to backend directory in command "npm install"
2.Then type "npm run dev"
3.Go to  http://localhost:5000/login.html //register.html

🛒 E-Commerce Web Application – Documentation Report

<img width="1920" height="1024" alt="Screenshot 2025-07-15 143050" src="https://github.com/user-attachments/assets/64a8db89-e319-4988-8410-65cef355044c" />


<img width="1920" height="1024" alt="Screenshot 2025-07-15 143132" src="https://github.com/user-attachments/assets/8d2e08ed-b0e4-4212-9942-577bafd610a5" />
<img width="1920" height="1024" alt="Screenshot 2025-07-15 143115" src="https://github.com/user-attachments/assets/17c4309d-37a4-4579-82c8-1ef564159c80" />
<img width="1920" height="1024" alt="Screenshot 2025-07-15 143132" src="https://github.com/user-attachments/assets/27565101-757c-4489-82ee-b93e9cf9e0c8" />





1. 📌 Project Overview
->This is a role-based E-commerce web application built using:

->Frontend: HTML, CSS (Bootstrap), JavaScript (Vanilla)

->Backend: Node.js, Express.js, MongoDB

->Authentication: JWT (JSON Web Tokens)

2. 👥 User Roles
There are two roles in the system: Admin and Customer

Role	   Permissions

->Admin	  ➕ Add Product, 📝 Edit Product, ❌ Delete Product
->Customer	🛍️ View Products, ➕ Add to Cart, ✅ Place Orders, 🧾 View Order History

3. 🧑‍💼 Admin Features
->ogin using admin credentials.
->Can add new products using + Add Product button.
->Can edit or delete any product in the product list.
->Cannot access Cart or Orders pages — those buttons are hidden.

4. 🙋‍♂️ Customer Features
->Login with customer credentials.
->Can view all products.
->Can search products by name or category.
->Can add products to the cart.
->Can update quantity or remove items from the cart.
->Can place an order from the cart.
->Can view order history on the Orders page.
->Cannot add, edit, or delete products — these buttons are hidden.

5. 🔐 Authentication
Users must log in to access the app.
->After login:
->A JWT token is stored in localStorage as token.
->A role is also saved in localStorage.
->These are used to show/hide UI and authorize requests to the backend.

6. 🧠 Search Functionality
Located at the top right of the product catalog.
->Allows searching by:
->Product Name
->Product Category
->Search is real-time and case-insensitive.

7. 🧰 Technology Stack
Layer	    Tool / Tech
Frontend	HTML, CSS (Bootstrap), JS
Backend	    Node.js, Express.js
Database	MongoDB with Mongoose ORM
Auth	    JWT-based authentication
API Design	RESTful
Deployment	Localhost (can be extended)

8. 🛠️ Setup Instructions
Clone the repository
->Run npm install inside the backend folder
->Set up your .env file with MongoDB URI and JWT secret
->Run server using node server.js or nodemon
-> #npm run dev next -> http://localhost:5000/login.html
Open index.html in the browser or serve using express static

Login using:
->Admin Credentials: admin@example.com / admin123
->Customer Credentials: customer@example.com / customer123

9. ✅ Future Enhancements
Payment gateway integration
Admin dashboard with charts (orders, revenue, users)
Pagination on orders page
User profile & address book
Responsive mobile design improvements

10. ✨ Summary
This E-commerce application is a complete full-stack project with:
->Role-based access control
->Secure JWT authentication
->Real-time search
->Dynamic UI rendering
->Modular, clean codebase



🚀 How to Use the Application
11. 🔐 Login
Users log in via login.html.

Upon login:

JWT token is stored in localStorage.

Role (admin or customer) is stored in localStorage.

12. 🛍️  Product Catalog (index.html)
All products are visible to all users.

Search feature allows filtering products by name or category.

Pagination included for product browsing.

🔍 Search
Type in product name or category.

Matches update the product grid dynamically.

13. 🛒  Cart (Only for Customers)
Customers can:

Add products to the cart.

Update quantity.

Remove products.

Place orders.

Admins are restricted from accessing the cart.

14. 📦  Orders (Only for Customers)
Customers can view all placed orders.

Order summary includes:

Product details

Quantity

Total price

Order date

15. ➕  Product Management (Only for Admins)
Admins can:

Add new products via add-product.html

Edit existing products

Delete products

Edit and delete buttons are only shown if the logged-in user is an admin.











