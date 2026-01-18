import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { getCachedUser } from "../auth/authStore";
import ProductCard from "../components/ProductCard";
import { loadCart, addToCart, getCartCount } from "../cart/cartStore";

export default function Items() {
  const user = getCachedUser();
  const userId = user?.id;
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [cart, setCart] = useState(loadCart(userId));

  async function load() {
    setErr("");
    try {
      const q = query.trim();
      const data = await api(q ? `/api/v1/items?query=${encodeURIComponent(q)}` : "/api/v1/items");
      setItems(data || []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  function handleAddToCart(item) {
    const updated = addToCart(userId, item);
    setCart(updated);
  }

  return (
    <div className="page">
      <div className="row">
        <h2>Items</h2>
        <div className="muted">In cart: {cartCount}</div>
      </div>

      <div className="card row" style={{ gap: 12 }}>
        <input
          placeholder="Search by name/description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btnPrimary" onClick={load}>
          Search
        </button>
      </div>

      {err && <div className="error">{err}</div>}

      <div className="grid">
        {items.map((it) => (
          <ProductCard key={it.id} item={it} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}