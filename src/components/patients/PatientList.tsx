import { Eye, Edit2, Trash2 } from "lucide-react";
import { Card } from "../ui/Card";
import type { Patient } from "../../types/patient";

interface PatientListProps {
  patients: Patient[];
  onDelete: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onView: (patient: Patient) => void;
}

const PatientList = ({
  patients,
  onDelete,
  onEdit,
  onView,
}: PatientListProps) => {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
            <th className="px-6 py-4 font-bold">Patient Details</th>
            <th className="px-6 py-4 font-bold">Diagnosis</th>
            <th className="px-6 py-4 font-bold">Status</th>
            <th className="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="hover:bg-slate-50/30 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">
                    {patient.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    Age: {patient.age}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {patient.diagnosis}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    patient.status === "Critical"
                      ? "bg-red-50 text-red-500"
                      : patient.status === "Stable"
                        ? "bg-emerald-50 text-emerald-500"
                        : "bg-amber-50 text-amber-500"
                  }`}
                >
                  {patient.status}
                </span>
              </td>
              {/* ACTIONS - ALWAYS VISIBLE */}
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onView(patient)}
                    className="p-2 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(patient)}
                    className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(patient)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default PatientList;
