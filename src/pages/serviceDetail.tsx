import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Doctor = {
  name: string;
  profession: string;
  experience: number;
};

type ServiceItem = {
  title: string;
  category: string;
  description: string;
  doctors?: Doctor[];
};

type RecordItem = {
  _id: string;
  category: string;
  title: string;
  description: string;
};

const categoryTheme: Record<string, { label: string; icon: string; theme: string }> = {
  doctor: { label: "Doctor Appointment", icon: "🩺", theme: "doctor" },
  pharmacy: { label: "Pharmacy", icon: "💊", theme: "pharmacy" },
  "lab-test": { label: "Lab Testing", icon: "🧪", theme: "lab" },
  ambulance: { label: "Ambulance", icon: "🚑", theme: "ambulance" },
  hospital: { label: "Hospital", icon: "🏥", theme: "hospital" },
  vaccination: { label: "Vaccination", icon: "💉", theme: "vaccination" },
};

function ServiceDetail() {
  const { category } = useParams();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    if (!category) return;

    fetch(`http://localhost:5000/api/services/${category}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((error) => console.error("Failed to load service detail:", error))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    if (!category) return;

    fetch(`http://localhost:5000/api/service-records/${category}`)
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error("Failed to load records:", error));
  }, [category]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !formData.title.trim() || !formData.description.trim()) {
      return;
    }

    try {
      if (editId) {
        const response = await fetch(`http://localhost:5000/api/service-records/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            title: formData.title,
            description: formData.description,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Update failed");
        }

        setRecords((prev) =>
          prev.map((item) => (item._id === editId ? { ...item, title: formData.title, description: formData.description } : item))
        );
      } else {
        const response = await fetch("http://localhost:5000/api/service-records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            title: formData.title,
            description: formData.description,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Create failed");
        }

        setRecords((prev) => [data.record, ...prev]);
      }

      setFormData({ title: "", description: "" });
      setEditId(null);
    } catch (error: any) {
      alert(error.message || "Operation failed");
    }
  };

  const handleEdit = (record: RecordItem) => {
    setEditId(record._id);
    setFormData({ title: record.title, description: record.description });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this record?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/service-records/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setRecords((prev) => prev.filter((item) => item._id !== id));
      alert(data.message);
    } catch (error: any) {
      alert(error.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="demo-container"><h2>Loading service details...</h2></div>;
  }

  if (!service) {
    return (
      <div className="demo-container">
        <h2>Service not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const theme = categoryTheme[service.category] || {
    label: service.category,
    icon: "✨",
    theme: "default",
  };

  return (
    <div className={`service-detail-page service-detail-page--${theme.theme}`}>
      <div className="service-detail-shell">
        <section className="service-detail-hero">
          <span className="service-detail-badge">{theme.icon} {theme.label}</span>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <Link className="service-detail-back" to="/">
            Back to home
          </Link>
        </section>

        <div className="service-detail-grid">
          <section className="service-detail-panel">
            <div className="service-detail-section-title-row">
              <h3>Available Doctors</h3>
            </div>

            {service.doctors && service.doctors.length > 0 ? (
              <div className="doctor-grid">
                {service.doctors.map((doctor, index) => (
                  <div className="doctor-info-card" key={`${doctor.name}-${index}`}>
                    <div className="doctor-info-card__avatar">{doctor.name.charAt(0)}</div>
                    <div>
                      <p className="doctor-info-card__name">{doctor.name}</p>
                      <p className="doctor-info-card__role">{doctor.profession}</p>
                      <p className="doctor-info-card__meta">{doctor.experience} years experience</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="service-detail-empty">No doctors available for this service yet.</p>
            )}
          </section>

          <section className="service-detail-panel service-detail-form-panel">
            <div className="service-detail-section-title-row">
              <h3>{editId ? "Update Record" : "Create Record"}</h3>
            </div>

            <form className="service-detail-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Record title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Record description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <button type="submit">{editId ? "Update Record" : "Add Record"}</button>
            </form>
          </section>

          <section className="service-detail-panel service-detail-records-panel">
            <div className="service-detail-section-title-row">
              <h3>Mongo CRUD Records</h3>
              <span>{records.length} saved</span>
            </div>

            {records.length === 0 ? (
              <p className="service-detail-empty">No records have been added for this service yet.</p>
            ) : (
              <div className="record-list">
                {records.map((record) => (
                  <article className="record-card" key={record._id}>
                    <div>
                      <p className="record-card__title">{record.title}</p>
                      <p className="record-card__description">{record.description}</p>
                    </div>
                    <div className="record-card__actions">
                      <button type="button" className="record-card__button record-card__button--secondary" onClick={() => handleEdit(record)}>
                        Edit
                      </button>
                      <button type="button" className="record-card__button record-card__button--danger" onClick={() => handleDelete(record._id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
