import { FormEvent, useState } from "react";
import "../css/doctorappointment.css";

function BookAppointment() {
    const [formData, setFormData] = useState({
        name: "",
        appointmentDate: "",
        appointmentTime: "",
    });
    const [message, setMessage] = useState("");
    const [submittedAppointment, setSubmittedAppointment] = useState<{
        name: string;
        appointmentDate: string;
        appointmentTime: string;
    } | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmittedAppointment(formData);
                setMessage(data.message || "Appointment request submitted successfully.");
                setFormData({ name: "", appointmentDate: "", appointmentTime: "" });
            } else {
                setMessage(data.message || "Unable to submit appointment request.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <main className="appointment-page">
            <form className="appointment-form" onSubmit={handleSubmit}>
                <h1>Book an appointment</h1>
                <label htmlFor="patient-name">Your name</label>
                <input
                    id="patient-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
                <label htmlFor="appointment-date">Preferred date</label>
                <input
                    id="appointment-date"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="appointment-time">Preferred time</label>
                <input
                    id="appointment-time"
                    name="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit appointment request</button>
                {message && <p className="appointment-message" role="status">{message}</p>}
                {submittedAppointment && (
                    <section className="appointment-summary" aria-live="polite">
                        <h2>Appointment details</h2>
                        <p><strong>Name:</strong> {submittedAppointment.name}</p>
                        <p><strong>Date:</strong> {submittedAppointment.appointmentDate}</p>
                        <p><strong>Time:</strong> {submittedAppointment.appointmentTime}</p>
                    </section>
                )}
            </form>
        </main>
    );
}

export default BookAppointment;