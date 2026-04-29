interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </div>
);
