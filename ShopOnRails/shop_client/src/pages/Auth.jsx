import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register } from "../auth/authStore";
import Loader from "../components/Loader";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Auth() {
  const nav = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  usePageTitle(isLogin ? "Login" : "Register");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await register({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        });
      }
      nav("/");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setIsLogin(!isLogin);
    setErr("");
    setForm({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  }

  return (
    <div className="page">
      {loading && <Loader />}
      <h2 className="fadeIn">{isLogin ? "Login" : "Register"}</h2>
      <form className="card fadeIn" onSubmit={onSubmit}>
        {!isLogin && (
          <>
            <label>
              First name
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Last name
              <input
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                required
              />
            </label>
          </>
        )}

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
          {isLogin ? "Login" : "Create account"}
        </button>
      </form>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            style={{
              background: "none",
              border: "none",
              color: "#78a0ff",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "inherit",
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
