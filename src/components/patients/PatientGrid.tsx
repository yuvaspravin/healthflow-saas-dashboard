import { Trash2, User, Eye, Edit2 } from "lucide-react";
import { Card } from "../ui/Card";
import type { Patient } from "../../types/patient";

interface PatientGridProps {
  patients: Patient[];
  onDelete: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onView: (patient: Patient) => void;
}

const PatientGrid = ({
  patients,
  onDelete,
  onEdit,
  onView,
}: PatientGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((p) => (
        <Card
          key={p.id}
          className="p-6 relative border-slate-200 transition-all shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-md"
        >
          {/* Status Badge */}
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold ${
              p.status === "Critical"
                ? "bg-red-50 text-red-500"
                : p.status === "Stable"
                  ? "bg-emerald-50 text-emerald-500"
                  : "bg-amber-50 text-amber-500"
            }`}
          >
            {p.status}
          </span>

          <div className="flex flex-col items-start gap-4">
            {/* User Icon Avatar */}
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <User size={24} />
            </div>

            {/* Name and Diagnosis */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
              <p className="text-sm text-slate-500 font-medium">
                {p.diagnosis}
              </p>
            </div>

            {/* Stats: Age and Last Visit */}
            <div className="w-full border-t border-slate-100 pt-4 mt-2 flex justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Age
                </p>
                <p className="text-sm font-bold text-slate-700">{p.age}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Last Visit
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {p.lastVisit}
                </p>
              </div>
            </div>
          </div>

          {/* PERMANENT ACTION BAR (Always Visible) */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
            <button
              title="View Details"
              onClick={() => onView(p)}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
            >
              <Eye size={18} />
            </button>
            <button
              title="Edit Patient"
              onClick={() => onEdit(p)}
              className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
            >
              <Edit2 size={18} />
            </button>
            <button
              title="Delete Record"
              onClick={() => onDelete(p)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PatientGrid;
