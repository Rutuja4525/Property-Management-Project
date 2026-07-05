import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaSignOutAlt, FaBuilding, FaFileAlt, FaChartPie, FaBell, FaSearch, FaUser } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2 px-3 sticky-top">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold fs-3 text-white d-flex align-items-center gap-2" to="/">
          <span style={{ filter: "drop-shadow(0 2px 4px rgba(37,99,235,0.4))" }}>🏠</span>
          <span className="bg-gradient text-primary fw-extrabold" style={{ letterSpacing: "-0.5px" }}>PropertyMS</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav mx-auto align-items-center gap-1">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === "/" ? "text-white fw-bold" : ""}`} to="/">
                Home
              </Link>
            </li>

            {user && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link px-3 d-flex align-items-center gap-1.5 ${location.pathname === "/dashboard" ? "text-white fw-bold" : ""}`} to="/dashboard">
                    <FaChartPie size={14} /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link px-3 d-flex align-items-center gap-1.5 ${location.pathname === "/properties" ? "text-white fw-bold" : ""}`} to="/properties">
                    <FaBuilding size={14} /> Properties
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link px-3 d-flex align-items-center gap-1.5 ${location.pathname === "/documents" ? "text-white fw-bold" : ""}`} to="/documents">
                    <FaFileAlt size={14} /> Documents
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link px-3 d-flex align-items-center gap-1.5 ${location.pathname === "/profile" ? "text-white fw-bold" : ""}`} to="/profile">
                    <FaUser size={14} /> Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                {/* Search Bar */}
                <div className="position-relative d-none d-lg-block" style={{ width: "200px" }}>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="form-control form-control-sm ps-4 pe-2 bg-secondary text-white border-0" 
                    style={{ borderRadius: "20px", fontSize: "13px" }}
                  />
                  <FaSearch className="position-absolute text-muted" style={{ left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "11px" }} />
                </div>

                {/* Notifications */}
                <button className="btn btn-link text-light p-1 position-relative" style={{ textDecoration: "none" }}>
                  <FaBell size={18} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px", padding: "3px 5px" }}>
                    3
                  </span>
                </button>

                {/* User Dropdown */}
                <div className="dropdown">
                  <button 
                    className="btn btn-link text-white dropdown-toggle d-flex align-items-center gap-2 p-0" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ textDecoration: "none" }}
                  >
                    <FaUserCircle size={24} className="text-light" />
                    <span className="small d-none d-sm-inline fw-semibold">{user.firstName}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" aria-labelledby="userDropdown" style={{ borderRadius: "10px" }}>
                    <li className="px-3 py-1 border-bottom mb-1">
                      <span className="fw-bold d-block small text-dark">{user.firstName} {user.lastName}</span>
                      <span className="badge bg-primary text-white mt-1" style={{ fontSize: "9px" }}>{user.role}</span>
                    </li>
                    <li>
                      <Link className="dropdown-item rounded small" to="/profile">My Profile</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rounded small" to="/dashboard">Dashboard</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        onClick={logout} 
                        className="dropdown-item text-danger d-flex align-items-center gap-1.5 rounded small"
                      >
                        <FaSignOutAlt size={13} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light btn-sm px-3"
                  to="/login"
                  style={{ borderRadius: "20px" }}
                >
                  Login
                </Link>

                <Link
                  className="btn btn-warning btn-sm px-3 text-dark fw-semibold"
                  to="/register"
                  style={{ borderRadius: "20px" }}
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;