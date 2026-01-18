import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function OrderDetails() {
  const { id } = useParams();
  usePageTitle(`Order #${id}`);
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      try {
        const data = await api(`/api/v1/orders/${id}`);
        setOrder(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [id]);

  return (
    <div className="page">
      <h2>Order #{id}</h2>
      {err && <div className="error">{err}</div>}
      {!order ? (
        <div className="muted">Loading...</div>
      ) : (
        <div className="card">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="muted">{new Date(order.created_at).toLocaleString()}</div>
            <div className="title">${order.amount}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            {(order.items || []).map((it) => (
              <div key={it.item_id} className="row" style={{ marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div className="title">{it.name}</div>
                  <div className="muted">${it.price}</div>
                </div>
                <div className="muted">x{it.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}