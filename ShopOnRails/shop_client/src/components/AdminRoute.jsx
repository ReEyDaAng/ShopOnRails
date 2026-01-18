import { Navigate } from "react-router-dom";
import { getCachedUser, isAuthed } from "../auth/authStore";

export default function AdminRoute({ children }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;

  const u = getCachedUser();
  if (!u || u.role !== "admin") return <Navigate to="/" replace />;

  return children;
}