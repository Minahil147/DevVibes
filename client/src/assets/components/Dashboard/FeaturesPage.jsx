import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import {
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaShieldAlt,
  FaGlobeAmericas,
} from "react-icons/fa";

const FeaturesPage = ({ onBack = null }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const features = [
    {
      id: 1,
      category: "collaboration",
      icon: <FaRocket className="text-4xl" />,
      title: "Real-time Collaboration",
      description:
        "Work together seamlessly with real-time updates, instant notifications, and synchronized project management.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      category: "networking",
      icon: <FaUsers className="text-4xl" />,
      title: "Professional Network",
      description:
        "Connect with developers worldwide, build meaningful professional relationships, and expand your network.",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      category: "knowledge",
      icon: <FaLightbulb className="text-4xl" />,
      title: "Knowledge Sharing",
      description:
        "Share your expertise through blogs, code snippets, and insights. Learn from the community.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 4,
      category: "events",
      icon: <FaCalendarAlt className="text-4xl" />,
      title: "Event Management",
      description:
        "Discover and participate in webinars, meetups, hackathons, and community events.",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      category: "analytics",
      icon: <FaChartLine className="text-4xl" />,
      title: "Analytics & Insights",
      description:
        "Track your profile growth, engagement metrics, and network statistics with detailed dashboards.",
      color: "from-red-500 to-rose-500",
    },
    {
      id: 6,
      category: "notifications",
      icon: <FaBell className="text-4xl" />,
      title: "Smart Notifications",
      description:
        "Stay updated with intelligent notifications for connections, messages, and activity on your network.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 7,
      category: "security",
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Enterprise Security",
      description:
        "End-to-end encryption, two-factor authentication, and advanced privacy controls.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 8,
      category: "global",
      icon: <FaGlobeAmericas className="text-4xl" />,
      title: "Global Reach",
      description:
        "Multi-language support, timezone management, and availability in 150+ countries.",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const categories = [
    { id: "all", label: "All Features", count: 8 },
    { id: "collaboration", label: "Collaboration", count: 1 },
    { id: "networking", label: "Networking", count: 2 },
    { id: "knowledge", label: "Knowledge", count: 1 },
    { id: "events", label: "Events", count: 1 },
    { id: "analytics", label: "Analytics", count: 1 },
    { id: "notifications", label: "Notifications", count: 1 },
    { id: "security", label: "Security", count: 1 },
    { id: "global", label: "Global", count: 1 },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => f.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        {onBack && (
          <motion.button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FaArrowLeft className="text-lg" />
            Back to Home
          </motion.button>
        )}

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to connect, collaborate, and grow as a
            developer. Explore our comprehensive feature set designed for modern
            teams.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700"
              }`}
            >
              {category.label}
              <span
                className={`text-sm ${
                  activeCategory === category.id
                    ? "bg-white/30"
                    : "bg-gray-200 dark:bg-gray-700"
                } px-2 py-0.5 rounded-full`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                    Learn more
                    <span className="ml-2 group-hover:ml-4 transition-all duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Start connecting with developers worldwide and unlock the full
              potential of our platform.
            </p>
            <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </div>
        </motion.div>

        {/* Features Comparison Table */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Free</th>
                  <th className="px-6 py-4 text-center font-semibold">Pro</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Real-time Collaboration
                  </td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Professional Network
                  </td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Knowledge Sharing
                  </td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Event Management
                  </td>
                  <td className="px-6 py-4 text-center">⭕</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Analytics & Insights
                  </td>
                  <td className="px-6 py-4 text-center">⭕</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Smart Notifications
                  </td>
                  <td className="px-6 py-4 text-center">⭕</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Enterprise Security
                  </td>
                  <td className="px-6 py-4 text-center">⭕</td>
                  <td className="px-6 py-4 text-center">⭕</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Global Reach
                  </td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
