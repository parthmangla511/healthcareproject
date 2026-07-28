import { useEffect, useState } from "react";
import "../css/pharmacy.css";

type Medicine = {
    name: string;
    dosage: string;
    price: number;
    quantity: number;
};

type PharmacyData = {
    _id?: string;
    pharmacyName: string;
    address: string;
    phoneNumber: string;
    email: string;
    availability: string;
    deliveryAvailable: boolean;
    medicines: Medicine[];
};

function Pharmacy() {
    const [pharmacies, setPharmacies] = useState<PharmacyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/pharmacies");
                if (!response.ok) {
                    throw new Error("Unable to load pharmacy data from the server.");
                }

                const data = await response.json();
                setPharmacies(Array.isArray(data) ? data : []);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unable to load pharmacy data.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchPharmacies();
    }, []);

    return (
        <div className="pharmacy-container">
            <section className="pharmacy-hero">
                <h1>Pharmacy Services</h1>
                <p>Browse trusted pharmacies and medicines from the connected backend service.</p>
            </section>

            {loading && <p className="status-message">Loading pharmacy details...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && pharmacies.length === 0 && <p className="status-message">No pharmacies are available right now.</p>}

            <div className="pharmacy-grid">
                {pharmacies.map((pharmacy) => (
                    <section key={pharmacy._id || pharmacy.pharmacyName} className="pharmacy-card">
                        <h2>{pharmacy.pharmacyName}</h2>
                        <div className="pharmacy-meta">
                            <p><strong>Address:</strong> {pharmacy.address}</p>
                            <p><strong>Contact:</strong> {pharmacy.phoneNumber}</p>
                            <p><strong>Email:</strong> {pharmacy.email}</p>
                            <p><strong>Availability:</strong> {pharmacy.availability}</p>
                            <p><strong>Delivery:</strong> {pharmacy.deliveryAvailable ? "Available" : "Not available"}</p>
                        </div>

                        <h3>Available Medicines</h3>
                        <div className="medicine-list">
                            {pharmacy.medicines.map((medicine, index) => (
                                <div key={`${pharmacy._id || pharmacy.pharmacyName}-${index}`} className="medicine-card">
                                    <h4>{medicine.name}</h4>
                                    <p>Dosage: {medicine.dosage}</p>
                                    <p>Price: Rs. {medicine.price}</p>
                                    <p>Quantity: {medicine.quantity}</p>
                                    <button type="button" className="pharmacy-button">Buy Now</button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Pharmacy;