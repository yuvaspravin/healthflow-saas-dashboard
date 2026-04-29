import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Card } from "../components/ui/Card";
import {
  Users,
  Activity,
  Clock,
  AlertCircle,
  ChevronRight,
  Calendar,
  BellRing,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setPatients, setLoading } from "../features/patients/patientSlice";
import { MOCK_PATIENTS } from "../features/patients/patientData";

import { Button } from "../components/ui/Button";
import { toast } from "sonner";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { patients, loading } = useAppSelector((state) => state.patients);

  // 1. Persistance/Fetch Logic
  useEffect(() => {
    if (patients.length === 0) {
      dispatch(setLoading(true));
      const timer = setTimeout(() => {
        dispatch(setPatients(MOCK_PATIENTS));
        dispatch(setLoading(false));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, patients.length]);

  // 2. Mock Appointments Data
  const upcomingAppointments = [
    { id: 1, patient: "Emma Watson", time: "10:30 AM", type: "Check-up" },
    { id: 2, patient: "Robert Fox", time: "11:15 AM", type: "Cardiology" },
    { id: 3, patient: "Jenny Wilson", time: "01:00 PM", type: "General" },
  ];

  const stats = [
    {
      label: "Total Patients",
      value: patients.length.toLocaleString(),
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Active Treatments",
      value: "42",
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Avg. Wait Time",
      value: "14 min",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Critical Cases",
      value: patients.filter((p) => p.status === "Critical").length.toString(),
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <MainLayout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm">
            Facility overview and upcoming schedule.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => toast.success("System is up to date")}
          className="flex items-center gap-2"
        >
          <BellRing size={18} /> Notifications
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="p-6 flex items-center gap-4 border-slate-100"
          >
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {loading ? "..." : stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RESTORED: Today's Appointments Section */}
        <Card className="p-6 border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Today's Appointments</h3>
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
              <Calendar size={18} />
            </div>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-center min-w-[60px]">
                    <p className="text-xs font-bold text-emerald-600">
                      {app.time.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {app.time.split(" ")[1]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {app.patient}
                    </p>
                    <p className="text-xs text-slate-500">
                      {app.type} Consultation
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[10px] font-bold px-3 border-slate-200"
                  onClick={() => toast.info(`Rescheduling ${app.patient}...`)}
                >
                  RESCHEDULE
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recently Added Section with WORKING View All */}
        <Card className="p-6 border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">
              Recently Added Patients
            </h3>
            {/* FUNCTIONAL BUTTON: Navigates to /patients */}
            <button
              onClick={() => navigate("/patients")}
              className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {patients.slice(0, 3).map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    {patient.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {patient.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {patient.diagnosis}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    patient.status === "Critical"
                      ? "text-red-500 bg-red-50"
                      : "text-emerald-500 bg-emerald-50"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
