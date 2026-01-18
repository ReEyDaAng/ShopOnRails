import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserEdit from "./pages/admin/AdminUserEdit";
import AdminItems from "./pages/admin/AdminItems";
import AdminItemEdit from "./pages/admin/AdminItemEdit";

import { refreshMe, isAuthed } from "./auth/authStore";

export default function App() {
  useEffect(() => {
    if (isAuthed()) {
      refreshMe().catch(() => {});
    }
  }, []);

  return (
    <div>
      <NavBar />
      <ScrollToTop />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <AdminRoute>
                <AdminUserEdit />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/items"
            element={
              <AdminRoute>
                <AdminItems />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/items/:id"
            element={
              <AdminRoute>
                <AdminItemEdit />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}