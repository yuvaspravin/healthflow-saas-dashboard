import { Users, TrendingUp, Activity, DollarSign } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Card } from "../components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Mock Data
const data = [
  { name: "Jan", patients: 400, revenue: 2400 },
  { name: "Feb", patients: 300, revenue: 1398 },
  { name: "Mar", patients: 500, revenue: 9800 },
  { name: "Apr", patients: 278, revenue: 3908 },
  { name: "May", patients: 189, revenue: 4800 },
];

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
  bgColor: string;
}

const Analytics = () => {
  return (
    <MainLayout>
      {/* 1. Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Performance Analytics
        </h1>
        <p className="text-slate-500">
          Visualizing patient growth and facility revenue trends.
        </p>
      </header>

      {/* 2. Quick Stats Grid - Makes the page look "Full" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value="1,284"
          icon={<Users size={20} />}
          trend="+12%"
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Revenue"
          value="$42,500"
          icon={<DollarSign size={20} />}
          trend="+8.4%"
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Avg. Visit Time"
          value="45m"
          icon={<Activity size={20} />}
          trend="-2m"
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Growth"
          value="24%"
          icon={<TrendingUp size={20} />}
          trend="+4%"
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
      </div>

      {/* 3. Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Patient Inflow */}
        <Card className="p-6 border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Patient Inflow (Monthly)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="patients"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Line Chart: Revenue Growth */}
        <Card className="p-6 border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Revenue Growth
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  trend,
  color,
  bgColor,
}: StatCardProps) => (
  <Card className="p-6 flex items-center justify-between border-slate-100 shadow-sm">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <span
          className={`text-xs font-bold ${trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
        >
          {trend}
        </span>
      </div>
    </div>
    <div
      className={`w-12 h-12 ${bgColor} ${color} rounded-2xl flex items-center justify-center`}
    >
      {icon}
    </div>
  </Card>
);

export default Analytics;
