import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState,useEffect, useContext } from "react";
import axios from "axios";



function Login() {
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

  

    const [error, setError] = useState("");

    useEffect(() => {
        setFormData({ email: "", password: "" });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting formData", formData);

        if (!formData.email || !formData.password) {
            setError("All fields are required");
            console.error("All fields are required");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            login(res.data.token);

            console.log("User logged in:", res.data);
            navigate("/dashboard"); 
            
        } catch (error) {
            console.error("Error Logging In:", error.response?.data || "Something went wrong");
            setError(error.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="px-4 py-4 justify-content-center align-items-center" style={{ display: "flex" }}>
            <form onSubmit={handleSubmit} style={{ width: "50%" }}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                </div>
                <div className="form-group py-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
