/**
 * Cart Store - User-specific cart management
 * Stores cart in localStorage keyed by user ID: cart:<userId>
 * For guest users (no auth), uses "cart:guest" key
 */

export function getCartKey(userId) {
  return userId ? `cart:${userId}` : "cart:guest";
}

export function loadCart(userId) {
  const key = getCartKey(userId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

export function saveCart(userId, cart) {
  const key = getCartKey(userId);
  localStorage.setItem(key, JSON.stringify(cart));
  // Dispatch event so NavBar updates immediately
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { userId } }));
}

export function clearCart(userId) {
  const key = getCartKey(userId);
  localStorage.removeItem(key);
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { userId } }));
}

export function getCartCount(cart) {
  return cart.reduce((sum, x) => sum + (x.quantity || 1), 0);
}

export function addToCart(userId, item) {
  const cart = loadCart(userId);
  const idx = cart.findIndex((x) => x.item_id === item.id);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + 1 };
  } else {
    cart.push({
      item_id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  }
  saveCart(userId, cart);
  return cart;
}

export function removeFromCart(userId, itemId) {
  const cart = loadCart(userId);
  const filtered = cart.filter((x) => x.item_id !== itemId);
  saveCart(userId, filtered);
  return filtered;
}

export function updateQty(userId, itemId, qty) {
  const cart = loadCart(userId);
  const q = Math.max(1, Number(qty) || 1);
  const updated = cart.map((x) =>
    x.item_id === itemId ? { ...x, quantity: q } : x
  );
  saveCart(userId, updated);
  return updated;
}
