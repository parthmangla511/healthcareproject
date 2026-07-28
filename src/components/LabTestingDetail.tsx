import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ===== LAB TESTING VIEW DETAILS COMPONENT =====
// This component displays detailed information for the Lab Testing service
// Including available lab tests and CRUD operations for test records

type RecordItem = {
  _id: string;
  category: string;
  title: string;
  description: string;
};

type LabTestingService = {
  title: string;
  category: string;
  description: string;
};

function LabTestingDetail() {
  const [service, setService] = useState<LabTestingService | null>(null);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [records, setRecords] = useState<RecordItem[]>([]);

  // Fetch lab testing service details
  useEffect(() => {
    fetch("http://localhost:5000/api/services/lab-test")
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((error) => console.error("Failed to load lab testing service:", error))
      .finally(() => setLoading(false));
  }, []);

  // Fetch lab testing records from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/service-records/lab-test")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error("Failed to load records:", error));
  }, []);

  // Handle form submission for creating/updating test records
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    try {
      if (editId) {
        // Update existing test record
        const response = await fetch(`http://localhost:5000/api/service-records/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: "lab-test",
            title: formData.title,
            description: formData.description,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Update failed");
        }

        setRecords((prev) =>
          prev.map((item) =>
            item._id === editId
              ? { ...item, title: formData.title, description: formData.description }
              : item
          )
        );
      } else {
        // Create new test record
        const response = await fetch("http://localhost:5000/api/service-records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: "lab-test",
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

  // Handle edit action
  const handleEdit = (record: RecordItem) => {
    setEditId(record._id);
    setFormData({ title: record.title, description: record.description });
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this lab test record?");
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
    return (
      <div className="demo-container">
        <h2>Loading lab testing details...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="demo-container">
        <h2>Lab testing service not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page service-detail-page--lab">
      <div className="service-detail-shell">
        <section className="service-detail-hero">
          <span className="service-detail-badge">🧪 Lab Testing</span>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <Link className="service-detail-back" to="/">
            Back to home
          </Link>
        </section>

        <div className="service-detail-grid">
          <section className="service-detail-panel service-detail-form-panel">
            <div className="service-detail-section-title-row">
              <h3>{editId ? "Update Lab Test" : "Add Lab Test"}</h3>
            </div>

            <form className="service-detail-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Test name (e.g., Blood Test, COVID-19 Test)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Test details, preparation instructions, or results information"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <button type="submit">{editId ? "Update Record" : "Add Record"}</button>
            </form>
          </section>

          <section className="service-detail-panel service-detail-records-panel">
            <div className="service-detail-section-title-row">
              <h3>Available Lab Tests</h3>
              <span>{records.length} tests</span>
            </div>

            {records.length === 0 ? (
              <p className="service-detail-empty">No lab tests are currently available.</p>
            ) : (
              <div className="record-list">
                {records.map((record) => (
                  <article className="record-card" key={record._id}>
                    <div>
                      <p className="record-card__title">{record.title}</p>
                      <p className="record-card__description">{record.description}</p>
                    </div>
                    <div className="record-card__actions">
                      <button
                        type="button"
                        className="record-card__button record-card__button--secondary"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="record-card__button record-card__button--danger"
                        onClick={() => handleDelete(record._id)}
                      >
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

export default LabTestingDetail;
