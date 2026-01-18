import { useMemo, useState } from "react";
import { api } from "../api/client";
import { isAuthed, getCachedUser } from "../auth/authStore";
import { useNavigate, Link } from "react-router-dom";
import {
  loadCart,
  saveCart,
  getCartCount,
  updateQty,
  removeFromCart,
} from "../cart/cartStore";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Cart() {
  usePageTitle("Cart");
  const nav = useNavigate();
  const user = getCachedUser();
  const userId = user?.id;
  const [cart, setCart] = useState(loadCart(userId));
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const total = useMemo(
    () =>
      cart.reduce((sum, x) => sum + Number(x.price) * Number(x.quantity), 0),
    [cart]
  );

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  function handleUpdateQty(itemId, qty) {
    const updated = updateQty(userId, itemId, qty);
    setCart(updated);
  }

  function handleRemoveItem(itemId) {
    const updated = removeFromCart(userId, itemId);
    setCart(updated);
  }

  async function checkout() {
    setErr("");
    setOk("");

    if (!cart.length) {
      setErr("Cart is empty");
      return;
    }

    if (!isAuthed()) {
      nav("/login");
      return;
    }

    try {
      const body = {
        items: cart.map((x) => ({ item_id: x.item_id, quantity: x.quantity })),
      };
      const created = await api("/api/v1/orders", { method: "POST", body });
      setOk(`Order created: #${created.id}, amount: ${created.amount}`);
      setCart([]);
      saveCart(userId, []);
      nav("/orders");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="cartHeader">
          <h2>🛒 Cart</h2>
          {cartCount > 0 && <span className="cartCountBadge">{cartCount}</span>}
        </div>
        <Link className="btn" to="/">← Back to shop</Link>
      </div>

      {err && <div className="error">{err}</div>}
      {ok && <div className="ok">{ok}</div>}

      {!cart.length ? (
        <div className="muted">Cart is empty</div>
      ) : (
        <div className="card">
          {cart.map((x) => (
            <div className="row" key={x.item_id} style={{ marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="title">{x.name}</div>
                <div className="muted">${x.price}</div>
              </div>
              <input
                style={{ width: 80 }}
                type="number"
                min="1"
                value={x.quantity}
                onChange={(e) => handleUpdateQty(x.item_id, e.target.value)}
              />
              <button className="btn" onClick={() => handleRemoveItem(x.item_id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="title">Total: ${total.toFixed(2)}</div>
            <button className="btn btnPrimary" onClick={checkout}>
              Pay (create order)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}