import React from "react";
import "./../styles.css";

export default function Loader({ fullScreen = true, children }) {
  return (
    <div className={`loader-overlay ${fullScreen ? "fullscreen" : ""}`}>
      <div className="loader-spinner" />
      {children}
    </div>
  );
}
