import { Bell } from "lucide-react";
import { useAppSelector } from "../../hooks/reduxHooks";

export const NotificationBell = () => {
  const { patients } = useAppSelector((state) => state.patients);
  const hasUpdates = patients.length > 0;

  return (
    <div className="relative p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl cursor-pointer transition-all">
      <Bell size={20} />

      {hasUpdates && (
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
      )}
    </div>
  );
};
