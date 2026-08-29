import {
  ArrowRight,
  ShieldCheck,
  Users,
  UserCog,
  Sparkles,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50 text-slate-800">
      
      {/* Navbar */}
      <nav className="border-b border-violet-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 p-2.5 shadow-lg shadow-violet-200">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-800">
                SecureAccess
              </h1>
              <p className="text-xs text-slate-500">
                Role Management System
              </p>
            </div>
          </div>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-500 hover:shadow-xl hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 active:scale-95"
          >
            Login
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-20">
          
          {/* Background decorations */}
          <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Secure Role-Based Access
            </div>

            {/* Heading */}
            <h2 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Manage Users with
              <span className="block bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Secure Role-Based Access
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              A secure user management platform where administrators
              control user accounts, roles, and access while users manage
              their own profiles.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/login")}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-200 transition-all duration-300 hover:-translate-y-1 hover:from-violet-500 hover:to-purple-500 hover:shadow-2xl hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 active:scale-95"
              >
                Login to Continue
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                Built for secure access
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                Everything you need to manage access
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                Keep your organization secure with centralized user and
                role management.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              
              {/* Admin */}
              <div className="group rounded-2xl border border-violet-100 bg-white/80 p-6 shadow-lg shadow-violet-100/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 transition-colors group-hover:bg-violet-600">
                  <UserCog className="h-6 w-6 text-violet-600 group-hover:text-white" />
                </div>

                <h4 className="text-xl font-bold text-slate-800">
                  Admin Control
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Administrators can create, update, and manage users
                  within the system.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Create users
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Manage user roles
                  </div>
                </div>
              </div>

              {/* User */}
              <div className="group rounded-2xl border border-purple-100 bg-white/80 p-6 shadow-lg shadow-purple-100/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 transition-colors group-hover:bg-purple-600">
                  <Users className="h-6 w-6 text-purple-600 group-hover:text-white" />
                </div>

                <h4 className="text-xl font-bold text-slate-800">
                  User Dashboard
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Users get their own dashboard to view and update
                  their profile information.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    View profile
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Update profile
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="group rounded-2xl border border-fuchsia-100 bg-white/80 p-6 shadow-lg shadow-fuchsia-100/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-200 hover:shadow-xl hover:shadow-fuchsia-100">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-100 transition-colors group-hover:bg-fuchsia-600">
                  <LockKeyhole className="h-6 w-6 text-fuchsia-600 group-hover:text-white" />
                </div>

                <h4 className="text-xl font-bold text-slate-800">
                  Secure Access
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Role-based authorization ensures that users can
                  access only the resources they are allowed to use.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    JWT authentication
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Role-based authorization
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-12 text-center shadow-2xl shadow-violet-200 sm:px-12">
            
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>

            <h3 className="mt-5 text-3xl font-bold text-white">
              Ready to access your dashboard?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-violet-100">
              Login with your credentials to access the dashboard
              assigned to your role.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-violet-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50 hover:shadow-xl active:scale-95"
            >
              Go to Login
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-violet-100 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 SecureAccess. Secure Role-Based User Management.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;