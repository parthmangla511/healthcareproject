import { useState } from "react";
import "../App.css";
import "../css/style.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone_number: "",
          message: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <section id="contact">
      <h1 className="h-primary center">Contact Us</h1>

      <div id="contact-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required/>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" name="phone_number" placeholder="Enter your phone number" value={formData.phone_number} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea name="message" rows={8} placeholder="Enter your message" value={formData.message} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <input type="submit"></input>
          </div>
        </form>
      </div>
    </section>
  );
}
// github comment
export default Contact;