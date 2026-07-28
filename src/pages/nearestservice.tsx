import { FormEvent, useState } from "react";
import "../css/nearestservice.css";

function NearestService() {
    const [city, setCity] = useState("");
    const [service, setService] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!city || !service) {
            setMessage("Please enter a location and select a service.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/nearest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ city, service }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to submit nearest service request.");
            }

            setMessage(data.message || "Nearest service request submitted successfully.");
            setCity("");
            setService("");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Network error.");
        }
    };

    return (
        <main className="nearest-service-page">
            <form className="nearest-service-form" onSubmit={handleSubmit}>
                <p className="nearest-service-form__eyebrow">MediSync Locator</p>
                <h1>Find Nearby Healthcare Services</h1>
                <p>Search for hospitals, clinics, and emergency services in your area.</p>

                <label htmlFor="search-location">Your city or location</label>
                <input
                    id="search-location"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="For example: Indore, Madhya Pradesh"
                    required
                />

                <label htmlFor="service-type">Service needed</label>
                <select
                    id="service-type"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select a service
                    </option>
                    <option value="Hospital">Hospital</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Emergency service">Emergency service</option>
                </select>

                <button type="submit">Find Services</button>
                {message && <p className="nearest-service-message">{message}</p>}
            </form>
        </main>
    );
}

export default NearestService;