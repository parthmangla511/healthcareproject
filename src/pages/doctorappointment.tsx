import { useEffect, useState } from "react";

function DoctorAppointment() {
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/services/doctor-booking")
            .then((res) => res.json())
            .then((data) => setService(data));
    }, []);

    if (!service) return <h2>Loading...</h2>;

    return (
        <div className="container">
            <h1>{service.title}</h1>

            {service.doctors.map((doctor: any, index: number) => (
                <div key={index}>
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