import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminUserEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  usePageTitle(isNew ? "Create User" : `Edit User #${id}`);
  const nav = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "user",
    password: "",
    password_confirmation: "",
  });

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    if (isNew) return;

    (async () => {
      setErr("");
      try {
        const u = await api(`/api/v1/admin/users/${id}`);
        setForm((f) => ({
          ...f,
          first_name: u.first_name || "",
          last_name: u.last_name || "",
          email: u.email || "",
          role: u.role || "user",
          password: "",
          password_confirmation: "",
        }));
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [id, isNew]);

  async function onSave(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      role: form.role,
    };

    if (form.password.trim()) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    try {
      if (isNew) {
        await api("/api/v1/admin/users", {
          method: "POST",
          body: { user: payload },
        });
        nav("/admin/users");
      } else {
        await api(`/api/v1/admin/users/${id}`, {
          method: "PATCH",
          body: { user: payload },
        });
        setOk("Saved!");
      }
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="page">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>Admin • {isNew ? "Create user" : `Edit user #${id}`}</h2>
        <Link className="btn" to="/admin/users">
          Back
        </Link>
      </div>

      {err && <div className="error">{err}</div>}
      {ok && <div className="ok">{ok}</div>}

      <form className="card" onSubmit={onSave}>
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

        <label>
          Role
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </label>

        <hr style={{ opacity: 0.2 }} />

        <label>
          Password {isNew ? "(required)" : "(optional)"}
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={isNew}
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
            required={isNew}
          />
        </label>

        <button className="btn btnPrimary" type="submit">
          {isNew ? "Create" : "Save"}
        </button>
      </form>
    </div>
  );
}