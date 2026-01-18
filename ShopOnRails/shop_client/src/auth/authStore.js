import { api, setToken, getToken } from "../api/client";
import { clearCart } from "../cart/cartStore";

const USER_KEY = "user_cache";

export function getCachedUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
export function setCachedUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

export function isAuthed() {
  return !!getToken();
}

export async function refreshMe() {
  if (!isAuthed()) return null;
  const me = await api("/api/v1/profile");
  setCachedUser(me);
  return me;
}

export async function register({ firstName, lastName, email, password }) {
  await api("/users", {
    method: "POST",
    body: {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: password,
        role: "user",
      },
    },
  });

  return login({ email, password });
}

export async function login({ email, password }) {
  await api("/users/sign_in", {
    method: "POST",
    body: { user: { email, password } },
  });

  return refreshMe();
}

export function logout() {
  const user = getCachedUser();
  const userId = user?.id;
  
  setToken("");
  setCachedUser(null);
  
  // Clear user's cart from localStorage
  if (userId) {
    clearCart(userId);
  }
}