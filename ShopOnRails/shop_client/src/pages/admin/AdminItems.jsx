import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminItems() {
  usePageTitle("Admin • Items");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const data = await api("/api/v1/admin/items");
      setItems(data || []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id) {
    if (!confirm("Delete item?")) return;
    try {
      await api(`/api/v1/admin/items/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="page">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>Admin • Items</h2>
        <Link className="btn btnPrimary" to="/admin/items/new">
          + Create
        </Link>
      </div>

      <div className="row" style={{ gap: 10, marginBottom: 10 }}>
        <Link className="btn" to="/admin/items">
          Items
        </Link>
        <Link className="btn" to="/admin/users">
          Users
        </Link>
      </div>

      {err && <div className="error">{err}</div>}

      <div className="card">
        {items.map((it) => (
          <div
            key={it.id}
            className="row"
            style={{ justifyContent: "space-between", marginBottom: 10 }}
          >
            <div style={{ flex: 1 }}>
              <div className="title">
                #{it.id} • {it.name}
              </div>
              <div className="muted">{it.description}</div>
              <div className="muted">${it.price}</div>
            </div>

            <Link className="btn" to={`/admin/items/${it.id}`}>
              Edit
            </Link>
            <button className="btn" onClick={() => onDelete(it.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}