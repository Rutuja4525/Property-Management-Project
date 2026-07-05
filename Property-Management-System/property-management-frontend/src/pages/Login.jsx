import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLoginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaBuilding, FaUserCheck } from "react-icons/fa";

function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    // Handle standard Google login callback
    const handleGoogleCallback = async (response) => {
        setError("");
        setLoading(true);
        try {
            const apiResponse = await googleLoginUser({
                credential: response.credential
            });
            login(apiResponse.data);
            navigate("/");
        } catch (err) {
            console.error("Google Auth failed", err);
            setError(err.response?.data?.message || "Google Sign-in failed. Please verify configurations.");
        } finally {
            setLoading(false);
        }
    };

    // Load Google script and render Google sign-in button
    useEffect(() => {
        if (isAuthenticated) return;

        const scriptId = "google-gsi-client";
        let script = document.getElementById(scriptId);

        const initGoogleButton = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "1023773177708-placeholder.apps.googleusercontent.com", // Fallback placeholder
                    callback: handleGoogleCallback,
                    cancel_on_tap_outside: false,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-btn"),
                    { 
                        theme: "outline", 
                        size: "large", 
                        width: "100%",
                        text: "signin_with",
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
            // Clean up if needed
        };
    }, [isAuthenticated]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginUser(formData);
            login(response.data);
            navigate("/");
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center flex-grow-1 my-5 animate-fade-in">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                    <div className="card auth-card p-4 p-sm-5 border-0">
                        
                        <div className="text-center mb-4">
                            <span className="fs-1">🔑</span>
                            <h2 className="fw-bold mt-2 mb-1" style={{ color: "var(--text-h)" }}>Welcome Back</h2>
                            <p className="text-muted small">Access your properties and management dashboard</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger border-0 py-2 small animate-fade-in" role="alert">
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                    <FaEnvelope className="me-2 text-muted" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control auth-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-4 text-start">
                                <div className="d-flex justify-content-between">
                                    <label className="form-label small fw-semibold" style={{ color: "var(--text-h)" }}>
                                        <FaLock className="me-2 text-muted" /> Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control auth-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-premium w-100 d-flex align-items-center justify-content-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                ) : null}
                                Sign In
                            </button>
                        </form>

                        <div className="divider">or sign in with</div>

                        <div className="google-btn-container">
                            <div id="google-signin-btn" className="w-100"></div>
                        </div>

                        <div className="text-center mt-4 pt-2 border-top">
                            <p className="text-muted small mb-0">
                                Don't have an account?{" "}
                                <Link to="/register" className="fw-bold text-decoration-none" style={{ color: "var(--accent)" }}>
                                    Register here
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;