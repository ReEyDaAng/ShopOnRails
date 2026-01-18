import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const data = await api("/api/v1/admin/users");
      setUsers(data || []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id) {
    if (!confirm("Delete user?")) return;
    try {
      await api(`/api/v1/admin/users/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="page">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>Admin • Users</h2>
        <Link className="btn btnPrimary" to="/admin/users/new">
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
        {users.map((u) => (
          <div
            key={u.id}
            className="row"
            style={{ justifyContent: "space-between", marginBottom: 10 }}
          >
            <div style={{ flex: 1 }}>
              <div className="title">
                #{u.id} • {u.first_name} {u.last_name}{" "}
                <span className="muted">({u.role})</span>
              </div>
              <div className="muted">{u.email}</div>
            </div>

            <Link className="btn" to={`/admin/users/${u.id}`}>
              Edit
            </Link>
            <button className="btn" onClick={() => onDelete(u.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}