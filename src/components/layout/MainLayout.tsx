import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Sidebar is fixed, so it takes up no "space" in the flow */}
      <Sidebar />

      {/* 2. Content is pushed 64 units (16rem) from the left to clear the sidebar */}
      <div className="ml-64 flex flex-col min-h-screen">
        <main className="p-8 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
