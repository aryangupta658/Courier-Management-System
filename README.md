# 🚚 CourierMS - Courier Management System

CourierMS is a full-stack **MERN Stack Courier Management System** designed to help customers book couriers, make secure online payments, track parcels live on map, download invoices, and communicate with delivery partners.

The system also provides complete role-based dashboards for **Admin**, **Customer**, and **Delivery Partner** to manage courier bookings, users, assignments, delivery status, payments, reports, live tracking, and delivery verification.

This project is built as a resume-level full-stack application with real-world features like **JWT Authentication, Role-Based Access, Razorpay Payment Integration, Live Location Tracking, Socket.IO Chat, Invoice Generation, OTP Delivery Verification, Proof Image Upload, Admin Reports, and Fully Responsive UI**.

---

## 🚀 Features

### 👤 Customer Features

- User signup and login
- Forgot password using OTP verification
- Book courier with sender, receiver, pickup, delivery, and parcel details
- Automatic estimated price calculation
- Estimated delivery date display
- Confirm courier details before payment
- Edit courier details before final payment
- Razorpay online payment integration
- Courier booking only after successful payment
- View personal courier bookings
- Track courier status
- Track delivery partner live location on map
- View delivery partner contact details
- Chat with assigned delivery partner
- Download payment invoice/proof
- Cancel courier before pickup
- Fully responsive customer dashboard

---

### 🛠️ Admin Features

- Admin login with protected admin dashboard
- View dashboard statistics
- Manage all courier bookings
- View complete courier/order details
- View sender, receiver, customer, and delivery partner details
- Assign delivery partner to courier
- Update courier status
- Search couriers
- Filter couriers by status
- Filter couriers by payment status
- View all registered users
- View complete user details including name, email, phone, address, and role
- Edit user details
- Delete users
- Edit courier details
- Delete courier records
- View reports and revenue
- Track total couriers, booked, assigned, in transit, delivered, cancelled, users, delivery partners, and revenue

---

### 🚴 Delivery Partner Features

- Delivery partner login with protected dashboard
- View assigned couriers
- Search assigned couriers
- View sender/customer details
- View receiver details
- View pickup and delivery address
- Update courier status
- Start live location tracking
- Share current location with customer
- Send delivery OTP
- Upload delivery proof image
- Mark courier as delivered after OTP verification
- Cancel courier if delivery cannot be completed
- Chat with customer
- View delivery earnings
- Fully responsive delivery dashboard

---

### 🗺️ Live Tracking Features

- Real-time delivery partner location tracking
- Interactive map using Leaflet
- Delivery partner can share live location
- Customer can view delivery partner current location
- Live latitude and longitude display
- Last updated time display
- Courier status display
- Real-time location update using Socket.IO

---

### 💳 Payment & Invoice Features

- Razorpay payment gateway integration
- Razorpay order creation
- Razorpay payment verification
- Courier booking after successful payment
- Payment ID storage
- Payment status display
- Invoice/payment proof generation
- Download invoice option
- Payment proof contains courier and payment details

---

### 💬 Chat Features

- Customer can chat with assigned delivery partner
- Delivery partner can chat with customer
- Chat available after courier assignment
- Real-time messaging using Socket.IO
- Separate chat pages for customer and delivery partner
- Mobile-compatible chat layout

---

### 📲 Delivery Verification Features

- Delivery partner uploads proof image
- Delivery OTP is sent to receiver
- Receiver shares OTP with delivery partner
- Delivery partner enters OTP
- Courier status updates to Delivered after successful OTP verification
- Admin can see updated delivery status

---

## 🧰 Tech Stack

### 🎨 Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- Lucide React Icons
- React Leaflet
- Leaflet
- Socket.IO Client

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- Bcrypt.js
- Razorpay
- Nodemailer
- Twilio
- Multer
- Socket.IO
- dotenv
- CORS

---

## 📁 Folder Structure

```txt
Courier-Management-System/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── courierController.js
│   │   ├── deliveryController.js
│   │   └── paymentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Chat.js
│   │   ├── Courier.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── courierRoutes.js
│   │   ├── deliveryRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── socket/
│   │   └── socket.js
│   │
│   ├── uploads/
│   │
│   ├── utils/
│   │   ├── generateTrackingId.js
│   │   ├── sendEmail.js
│   │   └── sendSMS.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── adminApi.js
│   │   │   ├── authApi.js
│   │   │   ├── axiosInstance.js
│   │   │   ├── chatApi.js
│   │   │   ├── courierApi.js
│   │   │   ├── deliveryApi.js
│   │   │   └── paymentApi.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── CourierCard.jsx
│   │   │   ├── MobileDrawer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NeedHelpCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicNavbar.jsx
│   │   │   ├── RoleRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── TrackingMap.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── CustomerLayout.jsx
│   │   │   └── DeliveryLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ManageCouriers.jsx
│   │   │   │   ├── ManageUsers.jsx
│   │   │   │   └── Reports.jsx
│   │   │   │
│   │   │   ├── customer/
│   │   │   │   ├── BookCourier.jsx
│   │   │   │   ├── CustomerChat.jsx
│   │   │   │   ├── CustomerChats.jsx
│   │   │   │   ├── CustomerDashboard.jsx
│   │   │   │   ├── Invoice.jsx
│   │   │   │   ├── LiveTrack.jsx
│   │   │   │   └── MyCouriers.jsx
│   │   │   │
│   │   │   ├── delivery/
│   │   │   │   ├── AssignedCouriers.jsx
│   │   │   │   ├── DeliveryChats.jsx
│   │   │   │   ├── DeliveryDashboard.jsx
│   │   │   │   ├── DeliveryLiveTracking.jsx
│   │   │   │   └── ShareLocation.jsx
│   │   │   │
│   │   │   └── public/
│   │   │       ├── About.jsx
│   │   │       ├── Contact.jsx
│   │   │       ├── Features.jsx
│   │   │       ├── ForgotPassword.jsx
│   │   │       ├── Home.jsx
│   │   │       ├── HowItWorks.jsx
│   │   │       ├── Login.jsx
│   │   │       ├── Register.jsx
│   │   │       └── TrackCourier.jsx
│   │   │
│   │   ├── socket/
│   │   │   └── socket.js
│   │   │
│   │   ├── utils/
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aryanheree/courier-management-system.git
cd courier-management-system
```

---

## 🖥️ Backend Setup

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Create Backend Environment File

Create a `.env` file inside the `backend` folder:

```bash
touch .env
```

Add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 4️⃣ Run Backend Server

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

## 🌐 Frontend Setup

### 5️⃣ Install Frontend Dependencies

Open a new terminal and go to the frontend folder:

```bash
cd frontend
npm install
```

If you are still inside the backend folder, use:

```bash
cd ../frontend
npm install
```

### 6️⃣ Create Frontend Environment File

Create a `.env` file inside the `frontend` folder:

```bash
touch .env
```

Add the following environment variables:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 7️⃣ Run Frontend

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

## 🔗 API Routes

### 🔐 Authentication Routes

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/profile
```

### 📦 Courier Routes

```txt
POST   /api/couriers
GET    /api/couriers/my-couriers
GET    /api/couriers/track/:trackingId
GET    /api/couriers/:id
PUT    /api/couriers/cancel/:id
```

### 💳 Payment Routes

```txt
POST /api/payments/create-order
POST /api/payments/verify
```

### 🛠️ Admin Routes

```txt
GET    /api/admin/dashboard
GET    /api/admin/couriers
GET    /api/admin/users
GET    /api/admin/reports
PUT    /api/admin/couriers/:id
PUT    /api/admin/users/:id
DELETE /api/admin/couriers/:id
DELETE /api/admin/users/:id
```

### 🚴 Delivery Routes

```txt
GET  /api/delivery/couriers
PUT  /api/delivery/couriers/:id/status
POST /api/delivery/couriers/:id/send-delivery-otp
POST /api/delivery/couriers/:id/mark-delivered
POST /api/delivery/couriers/:id/upload-proof
```

### 💬 Chat Routes

```txt
GET  /api/chats/:trackingId
POST /api/chats/:trackingId
```

---

## 🔄 Main Functional Flow

### 👤 Customer Flow

1. Customer creates an account.
2. Customer logs in.
3. Customer books a courier.
4. Customer enters sender, receiver, pickup, delivery, and parcel details.
5. System calculates estimated price and delivery date.
6. Customer confirms courier details.
7. Customer completes payment through Razorpay.
8. Courier is booked successfully.
9. Customer can view courier booking history.
10. Customer can track courier live on map.
11. Customer can chat with assigned delivery partner.
12. Customer can download invoice/payment proof.
13. Customer can cancel courier before pickup if required.

---

### 🛠️ Admin Flow

1. Admin logs in.
2. Admin views dashboard statistics.
3. Admin manages all couriers.
4. Admin views complete courier/order details.
5. Admin manages all users.
6. Admin edits or deletes user records.
7. Admin edits or deletes courier records.
8. Admin assigns delivery partner to courier.
9. Admin tracks payment status and courier status.
10. Admin views reports and revenue.

---

### 🚴 Delivery Partner Flow

1. Delivery partner logs in.
2. Delivery partner views assigned couriers.
3. Delivery partner starts live tracking.
4. Delivery partner updates courier status.
5. Delivery partner chats with customer.
6. Delivery partner uploads proof image.
7. Delivery partner sends OTP to receiver.
8. Receiver shares OTP with delivery partner.
9. Delivery partner verifies OTP.
10. Courier status is updated to Delivered.

---

## 📸 Screenshots

Add your project screenshots here after uploading them to GitHub.

```md
![Landing Page](screenshots/landing.png)
![Login Page](screenshots/login.png)
![Register Page](screenshots/register.png)
![Customer Dashboard](screenshots/customer-dashboard.png)
![Book Courier](screenshots/book-courier.png)
![My Couriers](screenshots/my-couriers.png)
![Live Tracking](screenshots/live-tracking.png)
![Invoice](screenshots/invoice.png)
![Admin Dashboard](screenshots/admin-dashboard.png)
![Manage Couriers](screenshots/manage-couriers.png)
![Manage Users](screenshots/manage-users.png)
![Delivery Dashboard](screenshots/delivery-dashboard.png)
![Assigned Couriers](screenshots/assigned-couriers.png)
```

Recommended screenshots to add:

```txt
Landing Page
Login Page
Register Page
Forgot Password Page
Customer Dashboard
Book Courier Page
My Couriers Page
Live Tracking Map
Invoice Page
Admin Dashboard
Manage Couriers Page
Manage Users Page
Reports Page
Delivery Dashboard
Assigned Couriers Page
Chat Page
Mobile Responsive View
```

---

## 🔐 Environment Variables

The project uses environment variables for secure configuration.

Do not push your real `.env` files to GitHub.

Use `.env.example` files to show required variables.

```txt
backend/.env           should not be pushed
frontend/.env          should not be pushed
backend/.env.example   should be pushed
frontend/.env.example  should be pushed
```

---

## 🛡️ Security Notes

- Passwords are hashed before storing in the database.
- JWT is used for protected routes.
- Admin, customer, and delivery partner routes are protected separately.
- Role-based access control is implemented.
- Sensitive keys are stored in environment variables.
- `.env` files are ignored using `.gitignore`.
- Razorpay secret key is not exposed publicly.
- Razorpay payment is verified using signature verification.
- OTP verification is used for forgot password and delivery completion.

---

## 📊 Project Highlights

- Complete MERN stack architecture
- Role-based authentication
- Admin, customer, and delivery dashboards
- Real payment gateway integration
- Live map tracking
- Socket.IO based chat system
- Invoice download system
- OTP based delivery verification
- Proof image upload
- Admin reports and revenue tracking
- Search and filter system
- Responsive and mobile-friendly UI

---

## 📱 Responsive Design

CourierMS is designed to be responsive and mobile compatible.

Responsive features include:

```txt
Mobile-friendly landing page
Responsive login and register pages
Responsive forgot password page
Mobile sidebar/drawer layout
Responsive customer dashboard
Responsive delivery dashboard
Responsive courier booking form
Responsive live tracking map
Responsive chat layout
Responsive invoice page
Scrollable tables on smaller screens
```

---

## 🔎 Search and Filter System

```txt
Public Track Page:
Tracking ID search

Customer Dashboard:
Search own couriers

Delivery Dashboard:
Search assigned couriers

Admin Manage Couriers:
Search + status filter + payment filter

Admin Manage Users:
Search by name, email, phone, and role
```

---

## 🧾 Invoice Details

The generated invoice/payment proof includes:

```txt
Tracking ID
Sender name
Sender phone
Receiver name
Receiver phone
Pickup address
Delivery address
Parcel type
Parcel weight
Delivery type
Estimated delivery date
Payment ID
Payment status
Total paid amount
```

---

## 📍 Live Tracking Details

Live tracking allows:

```txt
Delivery partner to share current location
Customer to view delivery partner location on map
Real-time location updates
Courier status updates
Latitude and longitude display
Last updated time display
```

---

## 🔮 Future Improvements

- Add Google Maps integration
- Add advanced route optimization
- Add automatic email invoice after payment
- Add push notifications
- Add admin export reports as PDF/Excel
- Add advanced analytics dashboard
- Add delivery partner performance report
- Add customer rating and review system
- Add multi-branch courier management
- Add dark mode
- Deploy frontend and backend online

---

## 👨‍💻 Author

**Aryan Gupta**

GitHub: [@aryanheree](https://github.com/aryanheree)

---

## ✅ Project Status

Completed for academic, portfolio, and resume purpose.
