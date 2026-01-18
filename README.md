# ShopOnRails

> ⚙️ **Тестове завдання для Solwey Consulting**  
> Проєкт реалізований у рамках тестового завдання на позицію web-розробника.  
> Мета — продемонструвати базову архітектуру інтернет-магазину з **Rails API backend**, **React frontend**, роботою з **PostgreSQL**, ролями користувачів (admin / user), автентифікацією через **Devise** та повним циклом оформлення замовлень.  
>  
> Основний фокус зроблено на **функціональність, чистоту коду та коректну взаємодію між frontend і backend**, без акценту на дизайн або UI-деталі.  
>  
> Backend реалізований як API-only застосунок, frontend розгорнутий окремо.  
> Проєкт задеплоєний на **безкоштовних хостингах (Vercel + Render)** для демонстрації роботи.

## 🌍 Live Demo

- **Frontend (Vercel):**  
  👉 https://shop-on-rails.vercel.app

- **Backend API (Render):**  
  👉 https://shoponrails.onrender.com  
  👉 https://shoponrails.onrender.com/api/v1/items

> ⚠️ Backend працює як API — відкриття `/` повертає 404 (очікувана поведінка)

---

## 📋 Структура проекту

```
ShopOnRails/
├── shop_api/          # Rails 7 API backend
└── shop_client/       # React + Vite frontend
```

### 📂 Детальна структура

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
│   │   ├── item.rb            # Модель товару
│   │   ├── order.rb           # Модель замовлення
│   │   ├── orders_description.rb  # Деталі замовлення
│   │   ├── user.rb            # Модель користувача (Devise)
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
│   ├── routes.rb              # API маршрути
│   ├── storage.yml
│   ├── environments/
│   │   ├── development.rb
│   │   ├── production.rb
│   │   └── test.rb
│   ├── initializers/
│   │   ├── cors.rb            # CORS налаштування
│   │   ├── devise.rb          # Devise конфіг
│   │   ├── filter_parameter_logging.rb
│   │   └── inflections.rb
│   └── locales/
│       ├── devise.en.yml
│       └── en.yml
├── db/
│   ├── migrate/               # Database миграції
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
├── Gemfile                    # Ruby залежності
├── Rakefile
├── config.ru                  # Rack конфіг
└── README.md
```

#### Frontend (shop_client)

```
shop_client/
├── src/
│   ├── api/
│   │   └── client.js          # HTTP клієнт
│   ├── auth/
│   │   └── authStore.js       # Zustand auth store
│   ├── cart/
│   │   └── cartStore.js       # Zustand cart store
│   ├── hooks/
│   │   └── usePageTitle.js    # Hook для динамічного title
│   ├── components/
│   │   ├── AdminRoute.jsx     # Route guard для адмін
│   │   ├── AvatarBadge.jsx    # Avatar компонент
│   │   ├── Loader.jsx         # Loading spinner
│   │   ├── NavBar.jsx         # Навігаційна панель
│   │   ├── ProductCard.jsx    # Карточка товару
│   │   ├── ProtectedRoute.jsx # Route guard для користувачів
│   │   └── ScrollToTop.jsx    # Auto-scroll на навігацію
│   ├── pages/
│   │   ├── Home.jsx           # Главная (магазин)
│   │   ├── Auth.jsx           # Login/Register
│   │   ├── Cart.jsx           # Кошик
│   │   ├── Items.jsx
│   │   ├── Login.jsx          # Login сторінка
│   │   ├── Orders.jsx         # Мої замовлення
│   │   ├── OrderDetails.jsx   # Деталі замовлення
│   │   ├── Profile.jsx        # Профіль користувача
│   │   ├── Register.jsx       # Реєстрація
│   │   └── admin/
│   │       ├── AdminItems.jsx      # Управління товарами
│   │       ├── AdminItemEdit.jsx   # Редагування товару
│   │       ├── AdminUsers.jsx      # Управління користувачами
│   │       └── AdminUserEdit.jsx   # Редагування користувача
│   ├── App.jsx                # Main компонент
│   ├── main.jsx               # Entry point
│   └── styles.css             # Global стилі
├── public/
│   └── favicon.svg            # Site іконка
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🚀 Технологічний стек

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

## 📦 Функціональність

### Для користувачів
- ✅ Реєстрація та вхід (JWT)
- ✅ Перегляд товарів з пошуком
- ✅ Кошик (зберігається локально)
- ✅ Оформлення замовлень
- ✅ Історія замовлень
- ✅ Профіль користувача

### Для адміністраторів
- ✅ Управління товарами (CRUD)
- ✅ Управління користувачами (CRUD)
- ✅ Перегляд всіх замовлень

## 🛠️ Встановлення

### Передумови
- Node.js 18+
- Ruby 3.0+
- PostgreSQL 12+
- Docker (опційно)

### Backend

```bash
cd shop_api

# Встановлення залежностей
bundle install

# Налаштування бази даних
rails db:create
rails db:migrate
rails db:seed

# Запуск сервера (development)
rails s -b 0.0.0.0 -p 3000
```

**Тестування:**
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

# Встановлення залежностей
npm install

# Development сервер
npm run dev

# Build для production
npm run build
```
> 💡 **Примітка щодо середовища**  
> Розробка та запуск виконувались у Linux-середовищі.  
> При роботі під Windows рекомендується використовувати **WSL (Ubuntu)** для стабільної роботи Rails та PostgreSQL.

## 🔗 API Endpoints

### Аутентифікація
- `POST /api/v1/users` - Реєстрація
- `POST /api/v1/sign_in` - Вхід
- `POST /api/v1/sign_out` - Вихід
- `GET /api/v1/profile` - Поточний користувач

### Товари
- `GET /api/v1/items` - Всі товари (з пошуком)
- `GET /api/v1/items/:id` - Товар за ID
- `POST /api/v1/admin/items` - Створити (admin)
- `PATCH /api/v1/admin/items/:id` - Оновити (admin)
- `DELETE /api/v1/admin/items/:id` - Видалити (admin)

### Замовлення
- `GET /api/v1/orders` - Замовлення користувача
- `GET /api/v1/orders/:id` - Замовлення за ID
- `POST /api/v1/orders` - Створити замовлення

### Користувачі (Admin)
- `GET /api/v1/admin/users` - Всі користувачі
- `GET /api/v1/admin/users/:id` - Користувач за ID
- `POST /api/v1/admin/users` - Створити
- `PATCH /api/v1/admin/users/:id` - Оновити
- `DELETE /api/v1/admin/users/:id` - Видалити

## 🔐 Аутентифікація

API використовує JWT токени для аутентифікації:

```
Authorization: Bearer <token>
```

Токен отримується при вході та зберігається в LocalStorage.

## 📱 Сторінки

### Публічні
- `/` - Головна (магазин товарів)
- `/login` - Вхід
- `/register` - Реєстрація
- `/cart` - Кошик

### Приватні (користувачі)
- `/profile` - Профіль
- `/orders` - Мої замовлення
- `/orders/:id` - Деталі замовлення

### Приватні (адміни)
- `/admin/items` - Управління товарами
- `/admin/items/new` - Додати товар
- `/admin/items/:id` - Редагування товару
- `/admin/users` - Управління користувачами
- `/admin/users/new` - Додати користувача
- `/admin/users/:id` - Редагування користувача

## 🎨 Features

- 🌙 Dark theme UI
- 📱 Responsive design
- 🔍 Live search з дебаунсом
- 🛒 Локальний кошик (IndexedDB)
- 🔐 JWT автентифікація
- ⚡ Динамічні page titles
- 🎯 Брейдкрамби та навігація

## 📝 Ліцензія

MIT

## 👨‍💻 Розробка

### Запуск обох сервісів

Terminal 1 (Backend):
```bash
cd shop_api && rails s -b 0.0.0.0
```

Terminal 2 (Frontend):
```bash
cd shop_client && npm run dev
```

Frontend буде доступний на `http://localhost:5173`
Backend - на `http://localhost:3000`

## 🐛 Тестування

Backend:
```bash
cd shop_api
rails test
```

Frontend: (розробка)
```bash
cd shop_client
npm test
```

## 📧 Контакти

Питання та пропозиції - welcome!
