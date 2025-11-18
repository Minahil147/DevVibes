import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaComment,
  FaFire,
  FaSearch,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

const CommunityPage = ({ onBack = null }) => {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Community Statistics
  const stats = [
    { label: "Active Members", value: "5,234", icon: <FaUsers /> },
    { label: "Posts & Discussions", value: "12,456", icon: <FaComment /> },
    { label: "Trending Topics", value: "324", icon: <FaFire /> },
    { label: "Community Events", value: "48", icon: <FaCalendarAlt /> },
  ];

  // Featured Members
  const featuredMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      avatar: "SC",
      followers: "2.5K",
      posts: "234",
      badges: ["Expert", "Active"],
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "AI/ML Engineer",
      avatar: "AR",
      followers: "3.1K",
      posts: "189",
      badges: ["Expert", "Mentor"],
      location: "Toronto, Canada",
      skills: ["Python", "TensorFlow", "NLP"],
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "UI/UX Designer",
      avatar: "PS",
      followers: "1.8K",
      posts: "156",
      badges: ["Active"],
      location: "Bangalore, India",
      skills: ["Figma", "Design Systems", "UX"],
    },
    {
      id: 4,
      name: "James Wilson",
      role: "DevOps Engineer",
      avatar: "JW",
      followers: "2.9K",
      posts: "267",
      badges: ["Expert", "Mentor", "Active"],
      location: "London, UK",
      skills: ["Kubernetes", "Docker", "CI/CD"],
    },
  ];

  // Discussion Topics
  const discussions = [
    {
      id: 1,
      title: "Best Practices for React Performance Optimization",
      author: "Sarah Chen",
      replies: 45,
      views: 2340,
      tags: ["React", "Performance"],
      timestamp: "2 hours ago",
      trending: true,
    },
    {
      id: 2,
      title: "Transitioning from Backend to Full Stack Development",
      author: "Mike Johnson",
      replies: 28,
      views: 1567,
      tags: ["Career", "Learning"],
      timestamp: "4 hours ago",
      trending: true,
    },
    {
      id: 3,
      title: "AWS Lambda vs EC2: When to Use What?",
      author: "James Wilson",
      replies: 62,
      views: 3891,
      tags: ["AWS", "DevOps"],
      timestamp: "6 hours ago",
      trending: true,
    },
    {
      id: 4,
      title: "Design System Best Practices for Large Teams",
      author: "Priya Sharma",
      replies: 34,
      views: 1823,
      tags: ["Design", "Teams"],
      timestamp: "8 hours ago",
      trending: false,
    },
  ];

  // Community Events
  const events = [
    {
      id: 1,
      title: "React Workshop: Advanced Hooks",
      date: "Nov 20, 2024",
      time: "7:00 PM EST",
      attendees: 234,
      location: "Online",
      category: "Workshop",
    },
    {
      id: 2,
      title: "Networking Coffee Chat",
      date: "Nov 22, 2024",
      time: "10:00 AM EST",
      attendees: 45,
      location: "San Francisco, CA",
      category: "Meetup",
    },
    {
      id: 3,
      title: "Hackathon 2024",
      date: "Nov 25-26, 2024",
      time: "All Day",
      attendees: 512,
      location: "Online",
      category: "Hackathon",
    },
    {
      id: 4,
      title: "AI/ML Roundtable Discussion",
      date: "Nov 28, 2024",
      time: "6:30 PM EST",
      attendees: 89,
      location: "Online",
      category: "Discussion",
    },
  ];

  // Tags for filtering
  const tags = [
    "all",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Design",
    "Career",
    "AI/ML",
  ];

  const filteredDiscussions =
    selectedTag === "all"
      ? discussions
      : discussions.filter((d) => d.tags.includes(selectedTag));

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
            Join Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Community
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with thousands of developers, share knowledge, and grow
            together. Explore discussions, events, and meet amazing people.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="text-4xl text-indigo-600 dark:text-indigo-400">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {["members", "discussions", "events"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-all duration-300 border-b-2 ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab === "members" && <FaUsers className="inline mr-2" />}
              {tab === "discussions" && <FaComment className="inline mr-2" />}
              {tab === "events" && <FaCalendarAlt className="inline mr-2" />}
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Content Section */}
        {activeTab === "members" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Community Members
            </h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {member.avatar}
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 text-center mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-4">
                    <FaMapMarkerAlt className="inline mr-1" />
                    {member.location}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-around text-center border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {member.followers}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Followers
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {member.posts}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Posts
                      </p>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    Follow
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === "discussions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Community Discussions
              </h2>

              {/* Search and Filter */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                {/* Tag Filter */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        selectedTag === tag
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discussions List */}
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDiscussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:border-indigo-600 border border-gray-200 dark:border-gray-700 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {discussion.trending && (
                            <FaFire className="text-red-500 text-lg" />
                          )}
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {discussion.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Posted by{" "}
                          <span className="font-semibold">
                            {discussion.author}
                          </span>{" "}
                          • {discussion.timestamp}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {discussion.views.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          views
                        </p>
                        <div className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                          {discussion.replies}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          replies
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === "events" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Upcoming Community Events
            </h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-l-4 border-indigo-600"
                >
                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full mb-4">
                    {event.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {event.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-3 mb-6 text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-3">
                      <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400 text-lg" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </p>
                    <p className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400 text-lg" />
                      <span>{event.location}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <FaUsers className="text-indigo-600 dark:text-indigo-400 text-lg" />
                      <span>{event.attendees} attendees</span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
                      Register Now
                    </button>
                    <button className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all">
                      Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 shadow-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Connect with thousands of developers, share your expertise, and grow
            together. Start your journey today!
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            Join Community
          </button>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;
