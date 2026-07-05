import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, googleLoginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaUserCheck } from "react-icons/fa";

function Register() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "TENANT"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    // Handle Google sign-in/registration callback
    const handleGoogleCallback = async (response) => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const apiResponse = await googleLoginUser({
                credential: response.credential,
                role: formData.role // Pass selected role for new user registration
            });
            login(apiResponse.data);
            setSuccess("Google Sign-in Successful!");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            console.error("Google Registration failed", err);
            setError(err.response?.data?.message || "Google registration failed. Please verify credentials.");
        } finally {
            setLoading(false);
        }
    };

    // Load Google script and render the button dynamically
    useEffect(() => {
        if (isAuthenticated) return;

        const scriptId = "google-gsi-client";
        let script = document.getElementById(scriptId);

        const initGoogleButton = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "1023773177708-placeholder.apps.googleusercontent.com",
                    callback: handleGoogleCallback,
                    cancel_on_tap_outside: false,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-signup-btn"),
                    { 
                        theme: "outline", 
                        size: "large", 
                        width: "100%",
                        text: "signup_with",
                        shape: "rectangular"
                    }
                );
            }
        };

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initGoogleButton;
            document.body.appendChild(script);
        } else {
            initGoogleButton();
        }

        return () => {
            // Clean up
        };
    }, [isAuthenticated, formData.role]); // Reload button when role changes to ensure callback captures current role

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await registerUser(formData);
            setSuccess("Account registered successfully! Redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || "Something went wrong during registration. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center flex-grow-1 my-5 animate-fade-in">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="card auth-card p-4 p-sm-5 border-0">

                        <div className="text-center mb-4">
                            <span className="fs-1">🏠</span>
                            <h2 className="fw-bold mt-2 mb-1" style={{ color: "var(--text-h)" }}>Create Account</h2>
                            <p className="text-muted small">Register to list your properties or find rental homes</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger border-0 py-2 small animate-fade-in" role="alert">
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success border-0 py-2 small animate-fade-in" role="alert">
                                Check {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3 text-start">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaUser className="me-2 text-muted" /> First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control auth-input"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3 text-start">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaUser className="me-2 text-muted" /> Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control auth-input"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3 text-start">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaEnvelope className="me-2 text-muted" /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control auth-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john.doe@example.com"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3 text-start">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaPhone className="me-2 text-muted" /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control auth-input"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="1234567890"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3 text-start">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaLock className="me-2 text-muted" /> Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control auth-input"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Min 6 characters"
                                        minLength="6"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-4 text-start">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaUserCheck className="me-2 text-muted" /> Desired Role
                                    </label>
                                    <select
                                        name="role"
                                        className="form-select auth-input"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="TENANT">Tenant (Find Properties)</option>
                                        <option value="OWNER">Property Owner (List Properties)</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-premium w-100 d-flex align-items-center justify-content-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm role-status me-2" role="status" aria-hidden="true"></span>
                                ) : null}
                                Register Account
                            </button>
                        </form>

                        <div className="divider">or sign up with</div>

                        <div className="google-btn-container">
                            <div id="google-signup-btn" className="w-100"></div>
                        </div>
                        <p className="text-muted small mt-1 mb-0" style={{ fontSize: "11px" }}>
                            * Selected role will be applied if you are a new user registering via Google.
                        </p>

                        <div className="text-center mt-4 pt-2 border-top">
                            <p className="text-muted small mb-0">
                                Already have an account?{" "}
                                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "var(--accent)" }}>
                                    Sign In here
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;