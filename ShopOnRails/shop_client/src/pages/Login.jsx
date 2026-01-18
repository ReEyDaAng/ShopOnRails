/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/authStore";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(form);
      nav("/items");
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <div className="page">
      <h2>Login</h2>
      <form className="card" onSubmit={onSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
}*/