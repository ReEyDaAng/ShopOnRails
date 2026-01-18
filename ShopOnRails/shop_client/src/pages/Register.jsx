/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../auth/authStore";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
      nav("/items");
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <div className="page">
      <h2>Register</h2>
      <form className="card" onSubmit={onSubmit}>
        <label>
          First name
          <input
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
        </label>
        <label>
          Last name
          <input
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>

        {err && <div className="error">{err}</div>}

        <button className="btn btnPrimary" type="submit">
          Create account
        </button>
      </form>
    </div>
  );
}*/