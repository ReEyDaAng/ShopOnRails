export default function AvatarBadge({ firstName = "", lastName = "" }) {
  const f = (firstName || "").trim();
  const l = (lastName || "").trim();
  const initials =
    (f ? f[0].toUpperCase() : "?") + (l ? l[0].toUpperCase() : "");

  return (
    <div
      title={`${f} ${l}`.trim()}
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.08)",
      }}
    >
      {initials}
    </div>
  );
}