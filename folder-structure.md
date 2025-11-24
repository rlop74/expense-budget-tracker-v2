# Monorepo

budget-tracker-fullstack/
│── backend/                     # Express server
│   ├── src/
│   │   ├── controllers/         # Request handlers (budget, transactions, users, etc.)
│   │   ├── routes/              # Express routes (budgetRoutes.js, userRoutes.js, etc.)
│   │   ├── middlewares/         # Auth, logging, error handling
│   │   ├── models/              # (Optional) DB models (if you add MongoDB/Postgres)
│   │   ├── config/              # DB connection, environment configs
│   │   └── app.js               # Express app setup (imports routes, middleware)
│   └── server.js                # Entry point (starts server)
│
│── frontend/                    # Static frontend (your existing HTML/CSS/JS)
│   ├── assets/                  # CSS, images, icons
│   │   ├── styles.css
│   │   └── template.png
│   ├── js/
│   │   └── script.js
│   ├── pages/                   # HTML files
│   │   ├── index.html
│   │   └── contact.html
│
│── node_modules/                # Installed dependencies
│── package.json
│── package-lock.json
│── .gitignore
│── README.md
│── implementation.md

# Split Projects (frontend + backend each with own dependencies)

budget-tracker-fullstack/
│── backend/                     # All server-side code
│   ├── src/
│   │   ├── controllers/         # Functions handling requests
│   │   ├── models/              # Database models (User, Transaction, etc.)
│   │   ├── routes/              # Express routes (auth, transactions, budget, etc.)
│   │   ├── middlewares/         # Authentication, error handling
│   │   ├── services/            # Business logic / helper services
│   │   ├── config/              # DB connection, environment configs
│   │   └── app.js               # Express app setup
│   ├── package.json
│   └── server.js                # Entry point (starts Express server)
│
│── frontend/                    # All client-side code
│   ├── public/                  # Static files (images, favicon, etc.)
│   ├── src/
│   │   ├── assets/              # CSS, images, icons
│   │   ├── js/                  # Vanilla JS or React components if you migrate later
│   │   ├── styles/              # CSS files
│   │   ├── pages/               # HTML files (index.html, contact.html)
│   │   └── script.js            # Main client logic
│   ├── package.json             # If you add a frontend build tool (React/Vite)
│
│── .gitignore
│── README.md
│── implementation.md
│── template.png