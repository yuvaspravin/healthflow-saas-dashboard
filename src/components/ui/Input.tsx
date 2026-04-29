interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
    )}
    <input
      className={`w-full px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 focus:ring-brand-primary/20 ${
        error ? "border-red-500" : "border-slate-200 focus:border-brand-primary"
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
