import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    companyName: "",
    companyCode: "",
    companyEmail: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const { confirmPassword: _confirm, ...payload } = formData;
    const result = await register(payload);

    setLoading(false);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-secondary/30 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[130px]" />
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
              <div className="rounded-2xl bg-gradient-to-r from-secondary to-primary p-3">
                <Sparkles size={28} className="text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-white via-violet-200 to-blue-300 bg-clip-text text-4xl font-black text-transparent xl:text-5xl">
                KnowFlow AI
              </h1>
            </div>

            <h2 className="max-w-xl text-5xl font-black leading-tight text-white xl:text-6xl">
              Build Your
              <span className="block bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                AI Knowledge Base
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
              Create your company workspace, upload PDFs, and chat with AI
              using your own knowledge base.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl sm:p-8">
              <div className="mb-6 text-center lg:text-left">
                <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
                  <div className="rounded-2xl bg-gradient-to-r from-secondary to-primary p-2.5">
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-black text-white">KnowFlow AI</h1>
                </div>

                <h2 className="text-3xl font-bold text-white">Create Account</h2>
                <p className="mt-2 text-slate-300">Register your company</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  icon={Building2}
                  variant="dark"
                  required
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="companyCode"
                    placeholder="Company Code"
                    value={formData.companyCode}
                    onChange={handleChange}
                    icon={Building2}
                    variant="dark"
                    required
                  />
                  <Input
                    type="email"
                    name="companyEmail"
                    placeholder="Company Email"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    icon={Mail}
                    variant="dark"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    icon={User}
                    variant="dark"
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    icon={User}
                    variant="dark"
                    required
                  />
                </div>

                <Input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  variant="dark"
                  required
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={Lock}
                  variant="dark"
                  error={errors.password}
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

                <Input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  icon={Lock}
                  variant="dark"
                  error={errors.confirmPassword}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-slate-300 transition hover:text-white"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                <Button type="submit" loading={loading} className="w-full">
                  Create Account
                  {!loading && <ArrowRight size={18} />}
                </Button>

                <p className="text-center text-sm text-slate-300">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-semibold text-accent transition hover:text-cyan-200"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
