import { useEffect, useState } from "react";
import { api } from "../api/client";
import { setCachedUser } from "../auth/authStore";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Profile() {
  usePageTitle("My Profile");
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function load() {
    setErr("");
    setOk("");
    try {
      const me = await api("/api/v1/profile");
      setUser(me);
      setForm((f) => ({
        ...f,
        first_name: me.first_name || "",
        last_name: me.last_name || "",
        email: me.email || "",
        password: "",
        password_confirmation: "",
      }));
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSave(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
    };

    if (form.password.trim()) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    try {
      const updated = await api("/api/v1/profile", {
        method: "PATCH",
        body: { user: payload },
      });
      setUser(updated);
      setCachedUser(updated);
      setOk("Saved!");
      setForm((f) => ({ ...f, password: "", password_confirmation: "" }));
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="page">
      <h2>Profile</h2>

      {err && <div className="error">{err}</div>}
      {ok && <div className="ok">{ok}</div>}

      {!user ? (
        <div className="muted">Loading...</div>
      ) : (
        <form className="card" onSubmit={onSave}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="muted">Role: {user.role}</div>
            <div className="muted">ID: {user.id}</div>
          </div>

          <label>
            First name
            <input
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
            />
          </label>

          <label>
            Last name
            <input
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <hr style={{ opacity: 0.2 }} />

          <label>
            New password (optional)
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
            />
          </label>

          <button className="btn btnPrimary" type="submit">
            Save
          </button>
        </form>
      )}
    </div>
  );
}