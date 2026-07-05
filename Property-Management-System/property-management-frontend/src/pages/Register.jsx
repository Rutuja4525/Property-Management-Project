import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "TENANT"
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(formData);

            setMessage(response.data);

            alert("Registration Successful");

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                role: "TENANT"
            });

        } catch (error) {

            setMessage("Registration Failed");

            alert("Something went wrong.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3 className="text-center">
                                User Registration
                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>First Name</label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Last Name</label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Phone</label>

                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Role</label>

                                    <select
                                        className="form-select"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >

                                        <option value="TENANT">
                                            Tenant
                                        </option>

                                        <option value="OWNER">
                                            Property Owner
                                        </option>

                                    </select>

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>

                            </form>

                            <p className="text-success mt-3">
                                {message}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;