import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Sparkles } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative z-10 w-full max-w-lg p-8 text-center sm:p-12"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-danger/10 to-danger/5"
        >
          <AlertTriangle size={40} className="text-danger" />
        </motion.div>

        <h1 className="mt-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-7xl font-black text-transparent">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-dark">Page Not Found</h2>

        <p className="mt-3 text-slate-500">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/dashboard">
            <Button icon={Sparkles} className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" icon={ArrowLeft} className="w-full sm:w-auto">
              Back to Login
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
