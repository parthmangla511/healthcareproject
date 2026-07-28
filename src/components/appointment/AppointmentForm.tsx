import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CategoryPicker from "./CategoryPicker";
import CategoryFields from "./CategoryFields";

const categories = [
  {
    key: "pharmacy",
    label: "Pharmacy",
    description: "Order meds and prescriptions.",
    accentColor: "#38bdf8",
  },
  {
    key: "lab-testing",
    label: "Lab Testing",
    description: "Book diagnostics and sample pickups.",
    accentColor: "#a78bfa",
  },
  {
    key: "ambulance",
    label: "Ambulance",
    description: "Request emergency transport.",
    accentColor: "#f97316",
  },
  {
    key: "flight-booking",
    label: "Flight Booking",
    description: "Arrange medical air travel.",
    accentColor: "#22c55e",
  },
  {
    key: "hospital-locator",
    label: "Nearest Hospital",
    description: "Locate the nearest care center.",
    accentColor: "#ef4444",
  },
  {
    key: "vaccination",
    label: "Vaccination",
    description: "Schedule vaccine appointments.",
    accentColor: "#f59e0b",
  },
  {
    key: "doctor-appointment",
    label: "Doctor Appointment",
    description: "Book a specialist consultation.",
    accentColor: "#0ea5e9",
  },
];

const defaultCategory = "pharmacy";

const initialSharedState = {
  userId: "guest",
  categoryKey: defaultCategory,
  serviceId: "",
  preferredDate: "",
  preferredTime: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  notes: "",
};

const getInitialCategoryData = () => ({
  prescriptionRequired: "",
  medicationList: "",
  testType: "",
  sampleType: "",
  pickupAddress: "",
  emergencyType: "",
  needWheelchair: "",
  origin: "",
  destination: "",
  passengerCount: "",
  currentAddress: "",
  searchRadiusKm: "",
  vaccineType: "",
  doseNumber: "",
  doctorName: "",
  specialty: "",
  appointmentReason: "",
});

function AppointmentForm() {
  const [categoryKey, setCategoryKey] = useState(defaultCategory);
  const [services, setServices] = useState<{ _id: string; title: string }[]>([]);
  const [formData, setFormData] = useState({ ...initialSharedState, ...getInitialCategoryData() });
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryMeta = useMemo(
    () => categories.find((category) => category.key === categoryKey) || categories[0],
    [categoryKey]
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services", {
          params: { category: categoryKey },
        });
        setServices(response.data);
      } catch (error) {
        console.error(error);
        setServices([]);
      }
    };
    fetchServices();
  }, [categoryKey]);

  const handleCategorySelect = (key: string) => {
    setCategoryKey(key);
    setFormData((prev) => ({
      ...prev,
      categoryKey: key,
      serviceId: "",
      ...getInitialCategoryData(),
    }));
  };

  const handleSharedChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.serviceId) return "Please choose a service.";
    if (!formData.preferredDate) return "Preferred date is required.";
    if (!formData.preferredTime) return "Preferred time is required.";
    if (!formData.contactName) return "Contact name is required.";
    if (!formData.contactEmail) return "Contact email is required.";
    if (!formData.contactPhone) return "Contact phone is required.";

    switch (categoryKey) {
      case "pharmacy":
        if (formData.prescriptionRequired === "") return "Please specify prescription requirement.";
        if (!formData.medicationList) return "Medication list is required.";
        break;
      case "lab-testing":
        if (!formData.testType) return "Test type is required.";
        if (!formData.sampleType) return "Sample type is required.";
        break;
      case "ambulance":
        if (!formData.pickupAddress) return "Pickup address is required.";
        if (!formData.emergencyType) return "Emergency type is required.";
        if (formData.needWheelchair === "") return "Please specify wheelchair support.";
        break;
      case "flight-booking":
        if (!formData.origin) return "Origin is required.";
        if (!formData.destination) return "Destination is required.";
        if (!formData.passengerCount || Number(formData.passengerCount) < 1) return "Passenger count must be at least 1.";
        break;
      case "hospital-locator":
        if (!formData.currentAddress) return "Current address is required.";
        if (!formData.searchRadiusKm || Number(formData.searchRadiusKm) < 1) return "Search radius must be at least 1 km.";
        break;
      case "vaccination":
        if (!formData.vaccineType) return "Vaccine type is required.";
        if (!formData.doseNumber || Number(formData.doseNumber) < 1) return "Dose number must be at least 1.";
        break;
      case "doctor-appointment":
        if (!formData.doctorName) return "Doctor name is required.";
        if (!formData.specialty) return "Specialty is required.";
        if (!formData.appointmentReason) return "Appointment reason is required.";
        break;
      default:
        return "Unknown category selected.";
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatusMessage("");
    const validationError = validate();
    if (validationError) {
      setStatusMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData, userId: formData.userId };
      await axios.post("http://localhost:5000/api/appointments", payload);
      setStatusMessage("Booking confirmed. We’ll contact you soon.");
      setFormData({ ...initialSharedState, categoryKey, ...getInitialCategoryData() });
    } catch (error: any) {
      setStatusMessage(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="rounded-[32px] border border-slate-800 bg-slate-950/95 p-8 shadow-[0_30px_60px_rgba(15,23,42,0.55)]">
        <div className="space-y-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">Appointment Booking</div>
            <h1 className="mt-3 text-3xl font-semibold text-white">Book a healthcare service in one place.</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Choose a service category, fill in the details, and submit. Every booking is validated both client-side and server-side.
            </p>
          </div>
          <CategoryPicker categories={categories} selected={categoryKey} onSelect={handleCategorySelect} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Date</span>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={(e) => handleSharedChange("preferredDate", e.target.value)}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Time</span>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => handleSharedChange("preferredTime", e.target.value)}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Contact name</span>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleSharedChange("contactName", e.target.value)}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Email</span>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleSharedChange("contactEmail", e.target.value)}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                  placeholder="jane@domain.com"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Phone</span>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleSharedChange("contactPhone", e.target.value)}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Service</span>
                <select
                  value={formData.serviceId}
                  onChange={(e) => handleSharedChange("serviceId", e.target.value)}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="space-y-4">
              <CategoryFields category={categoryKey} values={formData} onChange={handleCategoryChange} />
            </div>
            <div className="space-y-4">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Notes</span>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleSharedChange("notes", e.target.value)}
                  rows={4}
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-100"
                  placeholder="Additional instructions or preferences"
                />
              </label>
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full justify-center rounded-3xl bg-sky-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit Booking"}
              </button>
              {statusMessage && <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-200">{statusMessage}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
