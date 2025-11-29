# Shop Mesh Multi-Vendor E-Commerce Platform - Case Study

[Live Demo](https://shop-mesh.vercel.app/)

---

## Overview
The **Multi-Vendor E-Commerce Platform** is a comprehensive marketplace designed to seamlessly connect **customers, sellers, and administrators**.  

- **Customers** can browse products, participate in promotions, place orders, and communicate with sellers.  
- **Sellers** can create shops, manage product catalogs, process orders, and engage with customers.  
- **Administrators** oversee platform operations, manage users, and monitor system performance.  

The platform integrates **real-time communication, secure payment processing, and automated email notifications** to deliver a complete e-commerce experience.

---

## Project Goals
The platform aims to deliver a **scalable, feature-rich, and user-friendly marketplace** for both sellers and customers.  

- **Multi-vendor support:** Multiple independent sellers can manage their own shops with dedicated dashboards for products and orders.  
- **Complete e-commerce experience:** Customers can browse products, manage carts or wishlists, process payments via Stripe, and track their orders.  
- **Real-time communication:** Direct messaging enables efficient customer support and product inquiries.

---

## System Architecture
The platform uses a modern **full-stack JavaScript architecture**:

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 + Vite | User interface and build tooling |
| State Management | Redux Toolkit | Global application state |
| Backend | Express.js 5.1.0 | REST API server |
| Database | MongoDB + Mongoose 8.17.1 | Data storage and modeling |
| Real-time | Socket.io | Live messaging |
| Authentication | JWT + bcrypt | Secure authentication |
| Payments | Stripe 18.5.0 | Payment processing |
| File Storage | Cloudinary + Multer | Image upload and management |
| Email | Nodemailer 7.0.5 | Transactional emails |
| Deployment | Vercel | Hosting and production deployment |

**System Architecture Diagram**  
*(In Progress)*

---

## Key Features

### Multi-Role User System
The platform supports three user roles with dedicated interfaces:

- **Customer:** Browse products, manage cart, track orders, and chat with sellers.  
- **Seller:** Manage products, process orders, and track shop analytics.  
- **Admin:** Manage users, oversee orders, and perform platform administration.

### Product Management & Shopping
- **Product Search:** Real-time search with dropdown results.  
- **Category Navigation:** Grid-based browsing with icons.  
- **Shopping Cart:** Add to cart with stock validation.  
- **Wishlist Management:** Save or remove favorite products.

### Payment Processing
- **Stripe Integration:** Secure payment handling with conditional rendering based on API availability.

### Real-Time Messaging
- **Customer-Seller Chat:** Supports images and live updates.

### Seller Dashboard
- **Account Tracking:** Monitor revenue and service charges.  
- **Order Management:** Process all shop orders.  
- **Product Analytics:** Track performance and product count.  
- **Coupon Management:** Create and manage discount codes.

### API Architecture
Organized RESTful endpoints for different business domains:

- `/api/v2/user/*` – User authentication and profiles  
- `/api/v2/seller/*` – Shop and seller management  
- `/api/v2/product/*` – Product catalog operations  
- `/api/v2/order/*` – Order processing  
- `/api/v2/payment/*` – Payment integration  
- `/api/v2/conversation/*, /api/v2/messages/*` – Messaging system

---

## Brand Value Propositions
- Free shipping for orders over $100  
- Daily offers with up to 25% discounts  
- Factory-direct pricing for affordability  
- 100% secure payments

---

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Nodemailer, Stripe  
**Frontend:** React.js, Vite, Redux Toolkit  
**File Handling:** Multer, Cloudinary  
**Real-Time Communication:** Socket.io  
**Deployment:** Vercel  
**Development Tools:** Nodemon, dotenv

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|---------|
| Token expiration during sign-up | Adjusted React Strict Mode to prevent token re-render issues |
| Database schema errors | Reviewed and corrected Mongoose schemas for proper validation |
| Redux state not updating | Implemented async actions and proper state slices |
| Stripe payment issues | Used Stripe sandbox to debug before production |
| Image upload handling | Migrated from local storage to Cloudinary for scalability |
| Deployment errors (Vercel & Node.js) | Configured environment variables and server reload management |
| LocalStorage issues | Implemented proper JSON get/set logic for sessions |
| Data fetching/display | Set up API calls with hooks and error handling |
| Middleware configuration | Correctly configured Express middlewares for authentication and error handling |

---

## Database Design
*(In Progress)*

---

## Application Flow
- **User Flow:** *(In Progress)*  
- **Seller Flow:** *(In Progress)*  
- **Admin Flow:** *(In Progress)*

---

## Best Practices

### Authentication & Security
- JWT stored in HTTP-only cookies to prevent XSS attacks  
- Passwords hashed with bcrypt  
- Role-based authorization for protected operations

### Component Architecture
- Modular React components for maintainability  
- Protected routes for role-based access  
- Clean state management across all user flows

### Error Handling & UX
- Graceful error handling for cart and product operations  
- Stock validation for products  
- Toast notifications for user actions  
- Duplicate prevention in cart for smoother shopping

---

## Conclusion
The **Shop Mesh Multi-Vendor E-Commerce Platform** is a  production-ready solution that unites customers, sellers, and administrators in one ecosystem. With secure authentication, modular architecture, and enterprise-ready deployment, the platform provides both **technical excellence and business value** and is ready for real-world usage and future growth.

---
