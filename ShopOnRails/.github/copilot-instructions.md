# Copilot Instructions for Shop API & Client

## Project Overview

This is a **full-stack e-commerce application** with:
- **Backend**: Rails 7.1 API-only app with Devise-JWT authentication (`shop_api/`)
- **Frontend**: React 19 + Vite SPA (`shop_client/`)
- **Database**: PostgreSQL with user, item, and order management

**Key architectural pattern**: Monorepo with separate `/shop_api` and `/shop_client` folders. Both are developed independently but deployed as a unified application.

## Authentication & Authorization

### Architecture
- Uses **Devise + JWT** tokens for stateless auth
- JWT stored in `Authorization: Bearer <token>` header
- Users have two roles: `admin` or `user` (default)

### Implementation Details
- **Backend**: `User` model includes `Devise::JWT::RevocationStrategies::JTIMatcher` for token invalidation
  - JTI (JWT ID) generated on user creation: `ensure_jti!` callback
  - Devise configured in [config/initializers/devise.rb](shop_api/config/initializers/devise.rb)
  - Custom session response in [Users::SessionsController](shop_api/app/controllers/users/sessions_controller.rb) returns user object with role
  
- **Frontend**: Token stored in localStorage via `authStore.js`
  - `getToken()` / `setToken()` manage JWT storage
  - `isAuthed()` checks token presence
  - `refreshMe()` calls `/api/v1/profile` to verify auth on page load

### Protected Routes
- Use `authenticate_user!` before filter in controllers (e.g., [OrdersController](shop_api/app/controllers/api/v1/orders_controller.rb))
- React: `<ProtectedRoute>` wraps authenticated pages; `<AdminRoute>` for admin-only access

## API Design

### Structure
All endpoints under **`/api/v1/`** namespace in [config/routes.rb](shop_api/config/routes.rb):
- **Public**: `GET /api/v1/items` (search with `?query=name`)
- **Authenticated**: `POST /api/v1/orders`, `GET /api/v1/profile`
- **Admin**: `PUT /api/v1/admin/items/:id`, `DELETE /api/v1/admin/users/:id`

### Response Format
- Base controller: [Api::V1::BaseController](shop_api/app/controllers/api/v1/base_controller.rb)
- All responses are JSON
- Errors use `render_error(message, status:, details:)` helper
  - Example: `render_error("Item not found", status: :not_found)`
  - Includes optional `details` array for validation errors

### Client API Layer
[api/client.js](shop_client/src/api/client.js) provides a unified fetch wrapper:
```javascript
api(path, { method: 'POST', body: {...}, headers: {...} })
```
- Automatically adds JWT to `Authorization` header
- Uses `VITE_API_BASE_URL` environment variable (default: `http://localhost:3000`)

## Data Model & Relationships

### Key Entities
- **User**: Email login, first/last name, role (admin/user), JTI for token revocation
- **Item**: Product with name, price, description; can be ordered multiple times
- **Order**: Belongs to User; tracks total amount; contains multiple Items via `OrdersDescription` join table
- **OrdersDescription**: Join table between Orders and Items; stores quantity per item

### Naming Convention
- Join tables use singular suffix format: `OrdersDescription` (not `OrderItem`)
- Foreign keys follow standard Rails convention: `user_id`, `item_id`

## File Organization Patterns

### Backend (Rails)
```
app/controllers/
  api/v1/           # API namespace (all JSON responses)
    base_controller # Error handling helper
    items_controller
    orders_controller
    profiles_controller
    admin/          # Admin-only endpoints
  users/            # Devise custom controllers
    sessions_controller
    registrations_controller

app/models/
  *.rb              # ActiveRecord models with validations & associations
```

**Controllers inherit from `Api::V1::BaseController`** which extends `ApplicationController < ActionController::API`

### Frontend (React)
```
src/
  api/client.js           # Fetch wrapper with auth header injection
  auth/authStore.js       # Login/register logic, token & user cache
  components/             # Reusable UI (NavBar, ProtectedRoute, AdminRoute)
  pages/                  # Route-level components
    admin/                # Admin panels
```

## Critical Developer Workflows

### Backend
```bash
# Start server (uses Puma on port 3000)
rails s

# Run migrations
rails db:migrate

# Run tests
rails test

# Create new API endpoint: Use Api::V1::BaseController for inheritance
```

### Frontend
```bash
# Start dev server (Vite on port 5173)
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

### Running Both
- **Backend**: `rails s` → http://localhost:3000
- **Frontend**: `npm run dev` → http://localhost:5173
- CORS configured in [config/initializers/cors.rb](shop_api/config/initializers/cors.rb) to allow `http://localhost:5173`

## Testing Patterns

### Unit Tests
- Located in `test/models/` (e.g., [test/models/user_test.rb](shop_api/test/models/user_test.rb))
- Use Rails fixtures in `test/fixtures/` (YAML format)

### Test Data
- Fixtures available: `users.yml`, `items.yml`, `orders.yml`, `orders_descriptions.yml`

## Common Patterns & Conventions

### 1. Order Creation Logic
Order creation validates items exist, calculates total amount, and creates `OrdersDescription` entries:
- See [OrdersController#create](shop_api/app/controllers/api/v1/orders_controller.rb) for full flow
- **Validation**: Each item must exist and have quantity > 0

### 2. Error Handling
- Backend: Use `render_error()` for standardized JSON responses
  - Example: `render_error("Items not found", status: :not_found, details: missing_ids)`
- Frontend: All API calls wrapped in `api()` function; handle errors with try/catch

### 3. Authentication on Frontend
- Check `isAuthed()` before allowing access to protected pages
- On app load, call `refreshMe()` to re-establish session after page refresh
- Store both token and user object in localStorage for quick access

### 4. Admin Checks
- Backend: Use `current_user.admin?` method (returns `role == "admin"`)
- Frontend: Check `user.role === "admin"` in `<AdminRoute>` wrapper

## Deployment & Environment

- **Docker**: [Dockerfile](shop_api/Dockerfile) for Rails app with PostgreSQL
- **Environment Variables**: 
  - Backend: Use Rails secrets/credentials or `.env` (dotenv-rails enabled)
  - Frontend: Use `VITE_API_BASE_URL` for API endpoint (defaults to localhost:3000)

## Dependencies to Know

### Backend Key Gems
- `devise`, `devise-jwt`: Authentication with JWT tokens
- `pg`: PostgreSQL adapter
- `rails 7.1.3`: Web framework
- `puma`: Application server

### Frontend Key Packages
- `react 19.2`, `react-dom`: UI library
- `react-router-dom 7.12`: Client-side routing
- `vite`: Build tool and dev server

---

**Last Updated**: January 2026  
**Workspace Root**: `/home/reydang/projects/`
