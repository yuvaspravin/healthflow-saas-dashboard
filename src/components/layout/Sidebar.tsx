import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, LogOut } from "lucide-react";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", path: "/patients", icon: Users },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.error("Logout successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="fixed top-0 left-0 w-64 bg-brand-dark text-white h-screen flex flex-col p-4 z-30 shadow-2xl">
      {/* Brand Logo Area */}
      <div className="px-2 py-6 mb-4 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex-shrink-0"></div>
        <span className="text-xl font-bold tracking-tight">HealthFlow</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                  : "hover:bg-white/5 text-slate-300 hover:text-white"
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button Pinned to Bottom */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-colors group"
        >
          <LogOut size={20} className="group-hover:text-red-400" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
