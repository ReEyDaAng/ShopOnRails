import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../api/client";
import { getCachedUser } from "../auth/authStore";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { loadCart, addToCart, getCartCount } from "../cart/cartStore";

export default function Home() {
  const user = getCachedUser();
  const userId = user?.id;
  const location = useLocation();
  
  // Parse search param directly from location.search
  const urlQuery = new URLSearchParams(location.search).get("search") || "";
  
  const [query, setQuery] = useState(urlQuery);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(loadCart(userId));

  async function load(searchQuery) {
    setErr("");
    setLoading(true);
    try {
      const q = searchQuery.trim();
      const data = await api(q ? `/api/v1/items?query=${encodeURIComponent(q)}` : "/api/v1/items");
      setItems(data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Load items whenever the search parameter in URL changes
  useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get("search") || "";
    setQuery(searchParam);
    load(searchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.key]);

  // Debounce search input changes (3-5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      load(query);
    }, 4000);

    return () => clearTimeout(timer);
  }, [query]);

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  function handleAddToCart(item) {
    const updated = addToCart(userId, item);
    setCart(updated);
  }

  return (
    <div className="page">
      {loading && <Loader />}
      <div>
        <h1>Shop</h1>
        <p className="muted">Minimal UI for test task: items, cart, orders, JWT auth.</p>
      </div>

      <div className="card row searchRow">
        <input
          placeholder="Search by name/description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load(query)}
        />
        <button className="btn btnPrimary" onClick={() => load(query)}>
          <span className="btnIcon" aria-hidden="true">🔍</span>
          <span className="btnText">Search</span>
        </button>
        <Link className="btn btnSuccess" to="/cart">
          <span className="btnIcon" aria-hidden="true">🛒</span>
          <span className="btnText"> Go to cart</span>
        </Link>
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