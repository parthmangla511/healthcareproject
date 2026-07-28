import { FormEvent, useState } from "react";
import "../css/airplane.css";

type AirplaneFormData = {
    name: string;
    depature_city: string;
    destination_city: string;
    travel_date: string;
    contact_number: string;
    email: string;
};

function Airplane() {
    const [formData, setFormData] = useState<AirplaneFormData>({
        name: "",
        depature_city: "",
        destination_city: "",
        travel_date: "",
        contact_number: "",
        email: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/airplane", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setFormData({
                    name: "",
                    depature_city: "",
                    destination_city: "",
                    travel_date: "",
                    contact_number: "",
                    email: "",
                });
            } else {
                setMessage(data.message || "Unable to book flight service right now.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <main className="airplane-page">
            <form className="airplane-form" onSubmit={handleSubmit}>
                <p className="airplane-form__eyebrow">Medical travel assistance</p>
                <h1>Book Airplane Service</h1>
                <p className="airplane-form__intro">Request flight support and emergency medical coordination.</p>

                <label htmlFor="traveller-name">Patient name</label>
                <input id="traveller-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter patient name" required />

                <label htmlFor="departure-city">Departure city</label>
                <input id="departure-city" name="depature_city" type="text" value={formData.depature_city} onChange={handleChange} placeholder="Enter departure city" required />

                <label htmlFor="destination-city">Destination city</label>
                <input id="destination-city" name="destination_city" type="text" value={formData.destination_city} onChange={handleChange} placeholder="Enter destination city" required />

                <label htmlFor="travel-date">Travel date</label>
                <input id="travel-date" name="travel_date" type="date" value={formData.travel_date} onChange={handleChange} required />

                <label htmlFor="contact-number">Contact number</label>
                <input id="contact-number" name="contact_number" type="tel" value={formData.contact_number} onChange={handleChange} placeholder="Enter contact number" required />

                <label htmlFor="email-id">Email ID</label>
                <input id="email-id" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required />

                <button type="submit">Request Flight Service</button>
            </form>
        </main>
    );
}

export default Airplane;
