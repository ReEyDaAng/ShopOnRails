# ShopOnRails

> ⚙️ **Test Task for Solwey Consulting**  
> A project implemented as part of a test assignment for a web developer position.  
> The goal is to demonstrate a basic e-commerce architecture with **Rails API backend**, **React frontend**, working with **PostgreSQL**, user roles (admin / user), authentication via **Devise**, and a complete order management cycle.  
>  
> The main focus is on **functionality, code quality, and proper interaction between frontend and backend**, without emphasis on design or UI details.  
>  
> The backend is implemented as an API-only application, with the frontend deployed separately.  
> The project is deployed on **free hosting services (Vercel + Render)** for demonstration purposes.

## 🌍 Live Demo

- **Frontend (Vercel):**  
  👉 https://shop-on-rails.vercel.app

- **Backend API (Render):**  
  👉 https://shoponrails.onrender.com  
  👉 https://shoponrails.onrender.com/api/v1/items

> ⚠️ Backend works as an API — opening `/` returns 404 (expected behavior)

---

## 📋 Project Structure

```
ShopOnRails/
├── shop_api/          # Rails 7 API backend
└── shop_client/       # React + Vite frontend
```

### 📂 Detailed Structure

#### Backend (shop_api)

```
shop_api/
├── app/
│   ├── channels/              # WebSocket channels
│   │   └── application_cable/
│   ├── controllers/
│   │   ├── application_controller.rb
│   │   ├── api/               # API controllers
│   │   ├── concerns/
│   │   └── users/
│   ├── models/
│   │   ├── application_record.rb
│   │   ├── item.rb            # Item model
│   │   ├── order.rb           # Order model
│   │   ├── orders_description.rb  # Order details
│   │   ├── user.rb            # User model (Devise)
│   │   └── concerns/
│   ├── jobs/
│   │   └── application_job.rb
│   ├── mailers/
│   │   └── application_mailer.rb
│   └── views/
│       └── layouts/
├── config/
│   ├── application.rb
│   ├── boot.rb
│   ├── cable.yml
│   ├── credentials.yml.enc
│   ├── database.yml
│   ├── environment.rb
│   ├── puma.rb
│   ├── routes.rb              # API routes
│   ├── storage.yml
│   ├── environments/
│   │   ├── development.rb
│   │   ├── production.rb
│   │   └── test.rb
│   ├── initializers/
│   │   ├── cors.rb            # CORS configuration
│   │   ├── devise.rb          # Devise config
│   │   ├── filter_parameter_logging.rb
│   │   └── inflections.rb
│   └── locales/
│       ├── devise.en.yml
│       └── en.yml
├── db/
│   ├── migrate/               # Database migrations
│   │   ├── 20260112073448_devise_create_users.rb
│   │   ├── 20260112081302_create_items.rb
│   │   ├── 20260112081303_create_orders.rb
│   │   ├── 20260112081304_create_orders_descriptions.rb
│   │   └── 20260112140000_add_unique_index_to_orders_descriptions.rb
│   ├── schema.rb              # Schema snapshot
│   └── seeds.rb               # Seed data
├── lib/
│   ├── custom_failure_app.rb
│   └── tasks/
├── test/
├── Dockerfile
├── Gemfile                    # Ruby dependencies
├── Rakefile
├── config.ru                  # Rack configuration
└── README.md
```

#### Frontend (shop_client)

```
shop_client/
├── src/
│   ├── api/
│   │   └── client.js          # HTTP client
│   ├── auth/
│   │   └── authStore.js       # Zustand auth store
│   ├── cart/
│   │   └── cartStore.js       # Zustand cart store
│   ├── hooks/
│   │   └── usePageTitle.js    # Hook for dynamic title
│   ├── components/
│   │   ├── AdminRoute.jsx     # Route guard for admins
│   │   ├── AvatarBadge.jsx    # Avatar component
│   │   ├── Loader.jsx         # Loading spinner
│   │   ├── NavBar.jsx         # Navigation bar
│   │   ├── ProductCard.jsx    # Product card
│   │   ├── ProtectedRoute.jsx # Route guard for users
│   │   └── ScrollToTop.jsx    # Auto-scroll on navigation
│   ├── pages/
│   │   ├── Home.jsx           # Главная (shop)
│   │   ├── Auth.jsx           # Login/Register
│   │   ├── Cart.jsx           # Shopping cart
│   │   ├── Items.jsx
│   │   ├── Login.jsx          # Login page
│   │   ├── Orders.jsx         # My orders
│   │   ├── OrderDetails.jsx   # Order details
│   │   ├── Profile.jsx        # User profile
│   │   ├── Register.jsx       # Registration
│   │   └── admin/
│   │       ├── AdminItems.jsx      # Manage items
│   │       ├── AdminItemEdit.jsx   # Edit item
│   │       ├── AdminUsers.jsx      # Manage users
│   │       └── AdminUserEdit.jsx   # Edit user
│   ├── App.jsx                # Main component
│   ├── main.jsx               # Entry point
│   └── styles.css             # Global styles
├── public/
│   └── favicon.svg            # Site icon
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🚀 Technology Stack

### Backend (shop_api)
- **Rails 7** - Web framework
- **PostgreSQL** - Database
- **Devise** - User authentication
- **JWT** - API authentication
- **Docker** - Containerization
- **RSpec** - Testing

### Frontend (shop_client)
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Fetch API** - HTTP client

## 📦 Functionality

### For Users
- ✅ Registration and login (JWT)
- ✅ Browse products with search
- ✅ Shopping cart (stored locally)
- ✅ Order checkout
- ✅ Order history
- ✅ User profile

### For Administrators
- ✅ Manage products (CRUD)
- ✅ Manage users (CRUD)
- ✅ View all orders

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- Ruby 3.0+
- PostgreSQL 12+
- Docker (optional)

### Backend

```bash
cd shop_api

# Install dependencies
bundle install

# Setup database
rails db:create
rails db:migrate
rails db:seed

# Run server (development)
rails s -b 0.0.0.0 -p 3000
```

**Testing:**
```bash
rails test
```

**Docker:**
```bash
docker build -t shop-api .
docker run -p 3000:3000 shop-api
```

### Frontend

```bash
cd shop_client

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```
> 💡 **Note on Environment**  
> Development and execution were performed in a Linux environment.  
> When working on Windows, it's recommended to use **WSL (Ubuntu)** for stable Rails and PostgreSQL operation.

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/users` - Register
- `POST /api/v1/sign_in` - Login
- `POST /api/v1/sign_out` - Logout
- `GET /api/v1/profile` - Current user

### Products
- `GET /api/v1/items` - All items (with search)
- `GET /api/v1/items/:id` - Item by ID
- `POST /api/v1/admin/items` - Create (admin)
- `PATCH /api/v1/admin/items/:id` - Update (admin)
- `DELETE /api/v1/admin/items/:id` - Delete (admin)

### Orders
- `GET /api/v1/orders` - User orders
- `GET /api/v1/orders/:id` - Order by ID
- `POST /api/v1/orders` - Create order

### Users (Admin)
- `GET /api/v1/admin/users` - All users
- `GET /api/v1/admin/users/:id` - User by ID
- `POST /api/v1/admin/users` - Create
- `PATCH /api/v1/admin/users/:id` - Update
- `DELETE /api/v1/admin/users/:id` - Delete

## 🔐 Authentication

The API uses JWT tokens for authentication:


```
Authorization: Bearer <token>
```

The token is issued on login and stored in LocalStorage.

## 📱 Pages

### Public
- `/` — Home (product catalog)
- `/login` — Login
- `/register` — Registration
- `/cart` — Shopping cart

### Private (Users)
- `/profile` — User profile
- `/orders` — My orders
- `/orders/:id` — Order details

### Private (Admins)
- `/admin/items` — Product management
- `/admin/items/new` — Create product
- `/admin/items/:id` — Edit product
- `/admin/users` — User management
- `/admin/users/new` — Create user
- `/admin/users/:id` — Edit user

## 🎨 Features

- 🌙 Dark theme UI
- 📱 Responsive design
- 🔍 Live search with debounce
- 🛒 Local cart (IndexedDB)
- 🔐 JWT authentication
- ⚡ Dynamic page titles
- 🎯 Breadcrumbs and navigation

## 📝 License

MIT

## 👨‍💻 Development

### Running Both Services

Terminal 1 (Backend):
```bash
cd shop_api && rails s -b 0.0.0.0
```

Terminal 2 (Frontend):
```bash
cd shop_client && npm run dev
```

Frontend will be available at `http://localhost:5173`
Backend at `http://localhost:3000`

## 🐛 Testing

Backend:
```bash
cd shop_api
rails test
```

Frontend: (in development)
```bash
cd shop_client
npm test
```

## 📧 Contact

Questions and suggestions are welcome!
