import { useAppSelector } from "../../hooks/reduxHooks";
import { Bell } from "lucide-react";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
          H
        </div>
        <span className="text-xl font-bold text-brand-dark">HealthFlow</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-brand-primary relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">
              Admin User
            </p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
