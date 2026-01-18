import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminItemEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  usePageTitle(isNew ? "Create Item" : `Edit Item #${id}`);
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "0",
  });

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    if (isNew) return;

    (async () => {
      setErr("");
      try {
        const it = await api(`/api/v1/admin/items/${id}`);
        setForm({
          name: it.name || "",
          description: it.description || "",
          price: String(it.price ?? "0"),
        });
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
      name: form.name,
      description: form.description,
      price: Number(form.price),
    };

    try {
      if (isNew) {
        await api("/api/v1/admin/items", {
          method: "POST",
          body: { item: payload },
        });
        nav("/admin/items");
      } else {
        await api(`/api/v1/admin/items/${id}`, {
          method: "PATCH",
          body: { item: payload },
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
        <h2>Admin • {isNew ? "Create item" : `Edit item #${id}`}</h2>
        <Link className="btn" to="/admin/items">
          Back
        </Link>
      </div>

      {err && <div className="error">{err}</div>}
      {ok && <div className="ok">{ok}</div>}

      <form className="card" onSubmit={onSave}>
        <label>
          Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>

        <label>
          Description
          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </label>

        <label>
          Price
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </label>

        <button className="btn btnPrimary" type="submit">
          {isNew ? "Create" : "Save"}
        </button>
      </form>
    </div>
  );
}