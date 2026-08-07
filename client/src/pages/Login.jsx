import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData);

    setLoading(false);

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-[150px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="grid w-full max-w-7xl gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden flex-col justify-center lg:flex"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-3">
                <Sparkles size={28} className="text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-4xl font-black text-transparent xl:text-5xl">
                KnowFlow AI
              </h1>
            </div>

            <h2 className="max-w-xl text-5xl font-black leading-tight text-white xl:text-6xl">
              Your AI Powered
              <span className="block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                Knowledge Assistant
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
              Upload PDFs, search instantly, and chat with your company
              knowledge using AI.
            </p>

            <div className="mt-16 grid grid-cols-2 gap-5">
              {[
                { value: "99%", label: "Faster Document Search" },
                { value: "AI", label: "Context Aware Answers" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <h3 className="text-3xl font-bold text-white xl:text-4xl">
                    {stat.value}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl sm:p-8">
              <div className="mb-8 text-center lg:text-left">
                <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
                  <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-2.5">
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <h1 className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-2xl font-black text-transparent">
                    KnowFlow AI
                  </h1>
                </div>

                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Welcome Back
                </h2>
                <p className="mt-2 text-slate-300">Sign in to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  icon={Mail}
                  variant="dark"
                  required
                />

                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  icon={Lock}
                  variant="dark"
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-300 transition hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-transparent accent-accent"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-accent transition hover:text-cyan-200"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button type="submit" loading={loading} className="w-full">
                  Login
                  {!loading && <ArrowRight size={18} />}
                </Button>

                <p className="text-center text-sm text-slate-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-accent transition hover:text-cyan-200"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {[
        { className: "top-24 left-8 h-28 w-28 border border-accent/20 bg-accent/10", delay: 0 },
        { className: "bottom-24 left-1/4 h-16 w-16 bg-secondary/20 blur-sm", delay: 1 },
        { className: "right-16 top-20 h-36 w-36 border border-primary/20 bg-primary/10", delay: 2 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, i % 2 === 0 ? -20 : 25, 0], rotate: [0, i % 2 === 0 ? 8 : -10, 0] }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: blob.delay }}
          className={`absolute hidden rounded-full backdrop-blur-xl lg:block ${blob.className}`}
        />
      ))}
    </div>
  );
};

export default Login;
