import React from "react";

type Props = {
  category: string;
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
};

const FieldRow = ({ label, input }: { label: string; input: React.ReactNode }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-slate-200">{label}</div>
    {input}
  </div>
);

const CategoryFields = ({ category, values, onChange }: Props) => {
  switch (category) {
    case "pharmacy":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Prescription required"
            input={
              <select
                name="prescriptionRequired"
                value={values.prescriptionRequired ?? ""}
                onChange={(e) => onChange("prescriptionRequired", e.target.value === "true")}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
              >
                <option value="">Choose</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            }
          />
          <FieldRow
            label="Medication list"
            input={
              <input
                type="text"
                name="medicationList"
                value={values.medicationList || ""}
                onChange={(e) => onChange("medicationList", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="List medicines or prescription details"
              />
            }
          />
        </div>
      );
    case "lab-testing":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Test type"
            input={
              <input
                type="text"
                name="testType"
                value={values.testType || ""}
                onChange={(e) => onChange("testType", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Blood panel, imaging, PCR, etc."
              />
            }
          />
          <FieldRow
            label="Sample type"
            input={
              <select
                name="sampleType"
                value={values.sampleType || ""}
                onChange={(e) => onChange("sampleType", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
              >
                <option value="">Choose</option>
                <option value="Blood">Blood</option>
                <option value="Urine">Urine</option>
                <option value="Swab">Swab</option>
                <option value="Saliva">Saliva</option>
              </select>
            }
          />
        </div>
      );
    case "ambulance":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Pickup address"
            input={
              <input
                type="text"
                name="pickupAddress"
                value={values.pickupAddress || ""}
                onChange={(e) => onChange("pickupAddress", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Enter pickup location"
              />
            }
          />
          <FieldRow
            label="Emergency type"
            input={
              <input
                type="text"
                name="emergencyType"
                value={values.emergencyType || ""}
                onChange={(e) => onChange("emergencyType", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Medical emergency, accident, transfer"
              />
            }
          />
          <FieldRow
            label="Need wheelchair support"
            input={
              <select
                name="needWheelchair"
                value={values.needWheelchair ?? ""}
                onChange={(e) => onChange("needWheelchair", e.target.value === "true")}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
              >
                <option value="">Choose</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            }
          />
        </div>
      );
    case "flight-booking":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Origin"
            input={
              <input
                type="text"
                name="origin"
                value={values.origin || ""}
                onChange={(e) => onChange("origin", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Source city or airport"
              />
            }
          />
          <FieldRow
            label="Destination"
            input={
              <input
                type="text"
                name="destination"
                value={values.destination || ""}
                onChange={(e) => onChange("destination", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Destination city or airport"
              />
            }
          />
          <FieldRow
            label="Passenger count"
            input={
              <input
                type="number"
                min="1"
                name="passengerCount"
                value={values.passengerCount ?? ""}
                onChange={(e) => onChange("passengerCount", Number(e.target.value))}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
              />
            }
          />
        </div>
      );
    case "hospital-locator":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Current address"
            input={
              <input
                type="text"
                name="currentAddress"
                value={values.currentAddress || ""}
                onChange={(e) => onChange("currentAddress", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Your current location"
              />
            }
          />
          <FieldRow
            label="Search radius (km)"
            input={
              <input
                type="number"
                min="1"
                name="searchRadiusKm"
                value={values.searchRadiusKm ?? ""}
                onChange={(e) => onChange("searchRadiusKm", Number(e.target.value))}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
              />
            }
          />
        </div>
      );
    case "vaccination":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Vaccine type"
            input={
              <input
                type="text"
                name="vaccineType"
                value={values.vaccineType || ""}
                onChange={(e) => onChange("vaccineType", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Covid-19, Influenza, Tetanus"
              />
            }
          />
          <FieldRow
            label="Dose number"
            input={
              <input
                type="number"
                min="1"
                name="doseNumber"
                value={values.doseNumber ?? ""}
                onChange={(e) => onChange("doseNumber", Number(e.target.value))}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
              />
            }
          />
        </div>
      );
    case "doctor-appointment":
      return (
        <div className="space-y-4">
          <FieldRow
            label="Doctor name"
            input={
              <input
                type="text"
                name="doctorName"
                value={values.doctorName || ""}
                onChange={(e) => onChange("doctorName", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Consulting doctor"
              />
            }
          />
          <FieldRow
            label="Specialty"
            input={
              <input
                type="text"
                name="specialty"
                value={values.specialty || ""}
                onChange={(e) => onChange("specialty", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                placeholder="Cardiology, Pediatrics, etc."
              />
            }
          />
          <FieldRow
            label="Reason for appointment"
            input={
              <textarea
                name="appointmentReason"
                value={values.appointmentReason || ""}
                onChange={(e) => onChange("appointmentReason", e.target.value)}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100"
                rows={3}
                placeholder="Briefly describe your health concern"
              />
            }
          />
        </div>
      );
    default:
      return <div className="text-sm text-slate-400">Select a service category to continue.</div>;
  }
};

export default CategoryFields;
