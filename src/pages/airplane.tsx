import { FormEvent, useMemo, useState } from "react";
import "../css/airplane.css";

type AirplaneFormData = {
    name: string;
    depature_city: string;
    destination_city: string;
    travel_date: string;
    contact_number: string;
    email: string;
    serviceType: string;
    slot: string;
};

function Airplane() {
    const dateOptions = useMemo(() => {
        const options: { value: string; label: string }[] = [];
        const now = new Date();
        for (let i = 0; i < 7; i += 1) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            const value = date.toISOString().slice(0, 10);
            const label = date.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
            });
            options.push({ value, label });
        }
        return options;
    }, []);

    const [formData, setFormData] = useState<AirplaneFormData>({
        name: "",
        depature_city: "",
        destination_city: "",
        travel_date: dateOptions[0]?.value || "",
        contact_number: "",
        email: "",
        serviceType: "Flight Service",
        slot: "",
    });
    const [message, setMessage] = useState("");
    const [ticket, setTicket] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                setTicket(data.ticketNumber || null);
                setMessage(data.message || "Flight service requested successfully.");
                setFormData({
                    name: "",
                    depature_city: "",
                    destination_city: "",
                    travel_date: dateOptions[0]?.value || "",
                    contact_number: "",
                    email: "",
                    serviceType: "Flight Service",
                    slot: "",
                });
            } else {
                setMessage(data.message || "Unable to request flight service right now.");
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
                <h1>Request Flight Service</h1>
                <p className="airplane-form__intro">Request flight support and emergency medical coordination; choose a date and slot to raise a service ticket.</p>

                <label htmlFor="traveller-name">Patient name</label>
                <input id="traveller-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter patient name" required />

                <label htmlFor="departure-city">Departure city</label>
                <input id="departure-city" name="depature_city" type="text" value={formData.depature_city} onChange={handleChange} placeholder="Enter departure city" required />

                <label htmlFor="destination-city">Destination city</label>
                <input id="destination-city" name="destination_city" type="text" value={formData.destination_city} onChange={handleChange} placeholder="Enter destination city" required />

                <label htmlFor="travel-date">Preferred travel date</label>
                <select id="travel-date" name="travel_date" value={formData.travel_date} onChange={handleChange} required>
                    {dateOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <label htmlFor="service-type">Service type</label>
                <select id="service-type" name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                    <option value="Flight Service">Flight Service</option>
                    <option value="Medical Escort">Medical Escort</option>
                </select>

                <label htmlFor="appointment-slot">Choose available slot</label>
                <select id="appointment-slot" name="slot" value={formData.slot} onChange={handleChange} required>
                    <option value="">Select a slot</option>
                    <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM</option>
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                </select>

                <label htmlFor="contact-number">Contact number</label>
                <input id="contact-number" name="contact_number" type="tel" value={formData.contact_number} onChange={handleChange} placeholder="Enter contact number" required />

                <label htmlFor="email-id">Email ID</label>
                <input id="email-id" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required />

                <button type="submit">Request Flight Service</button>

                {message && <p className="appointment-message" role="status">{message}</p>}
                {ticket && (
                    <section className="appointment-summary" aria-live="polite">
                        <h2>Service ticket</h2>
                        <p><strong>Ticket:</strong> {ticket}</p>
                    </section>
                )}
            </form>
        </main>
    );
}

export default Airplane;
