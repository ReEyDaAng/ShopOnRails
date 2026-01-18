import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AvatarBadge from "./AvatarBadge";
import { getCachedUser, logout, isAuthed } from "../auth/authStore";
import { loadCart, getCartCount } from "../cart/cartStore";

export default function NavBar() {
  const nav = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNavSearch, setShowNavSearch] = useState(false);

  const authed = isAuthed();
  const user = getCachedUser();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    function updateCartCount() {
      const userId = user?.id;
      const cart = loadCart(userId);
      const count = getCartCount(cart);
      setCartCount(count);
    }

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, [user]);

  useEffect(() => {
    function handleScroll() {
      // Show search in navbar when main search is not visible (after ~200px scroll)
      setShowNavSearch(window.scrollY > 200);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onLogout() {
    logout();
    setMenuOpen(false);
    nav("/login");
  }

  function onUserClick() {
    closeMenu();
    nav("/profile");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleNavSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParam = encodeURIComponent(searchQuery.trim());
      nav(`/?search=${searchParam}`);
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="nav">
      <Link className="brand" to="/" onClick={closeMenu}>
        Shop
      </Link>

      <button
        className="burger"
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
      >
        ☰
      </button>

      <div id="nav-menu" className={`navMenu ${menuOpen ? "open" : ""}`}>
        <div className="right">
          {showNavSearch && (
            <form className="navSearchForm" onSubmit={handleNavSearch}>
              <input
                placeholder="Search by name/description…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="navSearchInput"
              />
              <button type="submit" className="btn btnPrimary navSearchBtn">
                🔍
              </button>
            </form>
          )}

          <nav className="links" onClick={closeMenu}>
            <NavLink to="/cart" title="Shopping cart" className="cartLink navBtn">
              Cart 🛒 {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
            </NavLink>
            {authed && <NavLink to="/orders" title="My orders" className="navBtn">Orders 📦</NavLink>}
            {authed && isAdmin && <NavLink to="/admin/users" className="navBtn">Admin</NavLink>}
          </nav>

          {!authed ? (
            <div className="authBtns">
              <Link className="btn" to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link className="btn btnPrimary" to="/register" onClick={closeMenu}>
                Register
              </Link>
            </div>
          ) : (
            <div className="userBox">
              <button
                className="userProfile"
                onClick={onUserClick}
                title="View profile"
              >
                <AvatarBadge
                  firstName={user?.first_name || ""}
                  lastName={user?.last_name || ""}
                />
                <div className="userText">
                  <div className="userName">
                    {(user?.first_name || "User") + " " + (user?.last_name || "")}
                  </div>
                  <div className="userEmail">
                    {user?.email} {isAdmin ? "• admin" : ""}
                  </div>
                </div>
              </button>
              <button className="btn logoutBtn" onClick={onLogout} title="Logout">
                🚪
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}