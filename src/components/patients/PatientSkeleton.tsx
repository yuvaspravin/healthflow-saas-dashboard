import { Card } from "../ui/Card";

export const PatientSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i} className="p-6 animate-pulse">
        <div className="flex justify-between mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-100 rounded w-1/2 mb-4"></div>
        <div className="border-t border-slate-100 pt-4 flex gap-4">
          <div className="h-8 bg-slate-100 rounded w-full"></div>
          <div className="h-8 bg-slate-100 rounded w-full"></div>
        </div>
      </Card>
    ))}
  </div>
);
