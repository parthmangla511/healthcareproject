import { useEffect, useState } from "react";

type Doctor = {
    name: string;
    profession: string;
    experience: number;
};

type DoctorService = {
    title: string;
    description: string;
    doctors: Doctor[];
};

function DoctorAppointment() {
    const [service, setService] = useState<DoctorService | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/services/doctor-booking")
            .then((res) => res.json())
            .then((data) => setService(data))
            .catch((error) => console.error("Failed to load doctor service:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (!service) return <h2>No doctor service data found.</h2>;

    return (
        <div className="container">
            <h1>{service.title}</h1>
            <p>{service.description}</p>

            {service.doctors.map((doctor: Doctor, index: number) => (
                <div key={`${doctor.name}-${index}`}>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.profession}</p>
                    <p>{doctor.experience} Years</p>

                    <button>Book Appointment</button>
                </div>
            ))}
        </div>
    );
}

export default DoctorAppointment;