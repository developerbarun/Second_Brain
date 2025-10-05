import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Build Your Second Brain
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-lg text-gray-600 max-w-xl"
        >
          Capture ideas, store links, and organize everything you learn —
          all in one place. Powered by simplicity and speed.
        </motion.p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Store Ideas",
            desc: "Save notes, videos, and articles to revisit anytime.",
            icon: "💡",
          },
          {
            title: "Organize Effortlessly",
            desc: "Group and tag your content for quick access.",
            icon: "🗂️",
          },
          {
            title: "Share Instantly",
            desc: "Generate shareable links for friends or teammates.",
            icon: "🔗",
          },
          {
            title: "Secure Access",
            desc: "Your data stays private and protected with JWT auth.",
            icon: "🔒",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl">{f.icon}</div>
            <h3 className="text-xl font-semibold mt-3">{f.title}</h3>
            <p className="text-gray-600 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Second Brain · Crafted with 💙 by Barun
      </footer>
    </div>
  );
}
