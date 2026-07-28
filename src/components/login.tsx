import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "../css/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email,
                    password,
                }
            );
            alert(response.data.message);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));

            if (response.data.user?.role === "admin") {
                navigate("/admin-bookings");
                return;
            }

            navigate("/");
        } 
        catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
    };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <p>If your specific account is not created then due to which you have to go to Sign Up to create your account.</p>
            </form>
        </div>
    );
}
export default Login;