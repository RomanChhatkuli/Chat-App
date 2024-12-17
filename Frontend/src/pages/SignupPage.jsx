import { useState } from "react"
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader, Loader2 } from 'lucide-react'
import { useAuthStore } from "../store/useAuthStore.js"
import { Link, Navigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  })
  const { signUp, isSigningUp } = useAuthStore()

  function validateForm() {
    if (!form.fullName.trim()) return toast.error("Full name is required")
    if (!form.email.trim()) return toast.error("Email is required")
    if (!form.email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")) return toast.error("Invalid email format")
    if (!form.password) return toast.error("Password is required")
    if (form.password.length < 6) return toast.error("Password should have atleast 6 characters")
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    console.log(success)
    if (success === true) {
      signUp(form)
      setForm({
        fullName: "",
        email: "",
        password: ""
      });
    }
  }

  return (
    <div className="min-h-[calc(100vh-2.6rem)] flex items-center justify-center bg-[#1a1517]">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-12 rounded-lg bg-[#3a2f33] flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-[#d4a853]" />
          </div>
          <h1 className="text-3xl font-semibold text-[#d4a853]">Create Account</h1>
          <p className="text-[#8b8685]">Get started with your free account</p>
        </div>

        {/* Form  */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-[#8b8685]">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8b8685]" />
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2 bg-[#3a2f33] rounded-md text-white placeholder-[#8b8685] focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-[#8b8685]">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8b8685]" />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 bg-[#3a2f33] rounded-md text-white placeholder-[#8b8685] focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#8b8685]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8b8685]" />
              <input
                id="password"
                value={form.password}
                placeholder=" **********"
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 bg-[#3a2f33] rounded-md text-white placeholder-[#8b8685] focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8685] hover:text-white focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-[#d4a853] hover:bg-[#c49843] text-black font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#d4a853] focus:ring-opacity-50"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin relative left-[45%]" />
              </>
            )
              : ("Create Account")
            }
          </button>
        </form>

        <p className="text-center text-[#8b8685]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#d4a853] hover:underline focus:outline-none focus:ring-2 focus:ring-[#d4a853] focus:ring-opacity-50">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

