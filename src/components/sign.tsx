import { useState } from "react";
import axios from "axios";
import "../App.css";
import "../css/sign.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
      });
      alert(res.data.message);
    } 
    catch (error) {
      console.error(error);
      alert("Signup Failed");
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>User Name:</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required/>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="submit">Sign Up</button>
        </form>
        <p>If your specific account is already then Login for entering into your specific account</p>
      </div>
    </main>
  );
}

export default Signup;