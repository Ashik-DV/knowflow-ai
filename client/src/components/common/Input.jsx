import { cn } from "../../utils/cn";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon: Icon,
  variant = "light",
  className = "",
  rightElement,
}) => {
  const fieldClass =
    variant === "dark" ? "input-field-dark" : "input-field";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "mb-2 block text-sm font-semibold",
            variant === "dark" ? "text-slate-200" : "text-slate-700"
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
              variant === "dark" ? "text-slate-400" : "text-slate-400"
            )}
          />
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={cn(
            fieldClass,
            Icon && "pl-11",
            rightElement && "pr-12",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            disabled && "cursor-not-allowed bg-slate-100",
            className
          )}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};

export default Input;
