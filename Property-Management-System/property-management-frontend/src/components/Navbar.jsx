import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          🏠 PropertyMS
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

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

          </ul>

          <div>
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2 text-white">
                  <FaUserCircle size={22} className="text-light" />
                  <div className="text-start">
                    <span className="fw-semibold d-block small mb-0 lh-1">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="badge bg-warning text-dark px-2 py-0.5 mt-1" style={{ fontSize: "10px", fontWeight: "600" }}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="btn btn-outline-light d-flex align-items-center gap-1 py-1.5 px-3 small fw-semibold"
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light me-2"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-warning"
                  to="/register"
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