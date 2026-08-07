import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  size = "md",
  icon: Icon,
}) => {
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3.5 text-sm rounded-2xl",
    lg: "px-8 py-4 text-base rounded-2xl",
    icon: "p-3 rounded-xl",
  };

  const variants = {
    primary: "gradient-btn font-semibold",
    secondary:
      "bg-white border border-border text-dark hover:bg-slate-50 font-semibold shadow-soft",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-dark font-medium",
    danger:
      "bg-danger hover:bg-red-600 text-white font-semibold shadow-soft",
    success:
      "bg-success hover:bg-emerald-600 text-white font-semibold shadow-soft",
    outline:
      "border border-primary/30 text-primary hover:bg-primary/5 font-semibold",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-300",
        sizes[size],
        variants[variant],
        (disabled || loading) && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
