import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Orders() {
  usePageTitle("My Orders");
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const data = await api("/api/v1/orders");
      setOrders(data || []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>📦 My orders</h2>
        <Link className="btn" to="/">← Back to shop</Link>
      </div>
      {err && <div className="error">{err}</div>}

      {!orders.length ? (
        <div className="muted">No orders yet</div>
      ) : (
        <div className="grid">
          {orders.map((o) => (
            <div className="card orderCard" key={o.id}>
              <div className="title">Order #{o.id}</div>
              <div className="muted">{new Date(o.created_at).toLocaleString()}</div>
              <div className="price">${o.amount}</div>
              <div className="muted">{o.items?.length || 0} items</div>
              <Link className="btn" to={`/orders/${o.id}`}>
                Open
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}