import { useState, useEffect } from "react";
import useAuth from "../../../auth/useAuth";
import Activity from "./Activity";
import Events from "./Events";
import UserInfo from "./UserInfo";
import Blogs from "./Blogs";
import Posts from "../posts/Posts";
import WelcomeBanner from "./WelcomeBanner";
import MutualPeople from "./MutualPeople";
import FeaturesPage from "./FeaturesPage";
import CommunityPage from "./CommunityPage";
import { axiosPrivate } from "../../../api/axios";

const POST_URL = "/api/posts";

const DashboardLanding = () => {
  const { auth, setAuth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState("default");

  // Fetch posts for authenticated users
  const fetchPosts = async (page = 1) => {
    if (!auth?.id || !auth?.following) return;
    setLoading(true);
    try {
      const userIds = [auth.id, ...auth.following].join(",");
      const response = await axiosPrivate.get(
        `${POST_URL}?page=${page}&limit=10&userIds=${userIds}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      setPosts(response.data.posts);
      posts.length <= 0 && setCurrentPage(1);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load posts when authenticated
  useEffect(() => {
    if (auth?.accessToken) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.accessToken]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Show Features Page
  if (view === "features") {
    return <FeaturesPage onBack={() => setView("default")} />;
  }

  // Show Community Page
  if (view === "community") {
    return <CommunityPage onBack={() => setView("default")} />;
  }

  // Unauthenticated Landing Page
  if (!auth?.accessToken) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">DC</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  DevConnect
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                <button
                  onClick={() => setView("features")}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => setView("community")}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Community
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Connect with{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Developers
                </span>{" "}
                Worldwide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                DevConnect is the ultimate platform for developers to share
                ideas, collaborate on projects, build networks, and create
                meaningful professional relationships.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all">
                  Explore Features
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Build Together
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Collaborate on exciting projects and share your expertise with
                  the global developer community.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Network & Grow
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Connect with thousands of developers and expand your
                  professional network globally.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Share & Learn
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Share your knowledge, blog posts, and insights with the
                  community and grow together.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg mb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    5000+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Active Developers
                  </p>
                </div>
                <div className="text-center border-l border-r border-gray-200 dark:border-gray-700">
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    10K+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Connections Made
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    500+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Active Projects
                  </p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Why Choose DevConnect?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Real-time Collaboration
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Work together on projects with real-time updates and
                      instant notifications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Professional Network
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Build meaningful connections with developers from around
                      the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Knowledge Sharing
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Share blogs, code snippets, and insights with the
                      community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Event Management
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Discover and participate in meetups, webinars, and
                      community events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">DC</span>
                  </div>
                  <span className="font-bold">DevConnect</span>
                </div>
                <p className="text-gray-400">
                  The ultimate platform for developers to connect and grow
                  together.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-indigo-400 cursor-pointer transition">
                    Features
                  </li>
                  <li className="hover:text-indigo-400 cursor-pointer transition">
                    Pricing
                  </li>
                  <li className="hover:text-indigo-400 cursor-pointer transition">
                    Security
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Community</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-indigo-400 cursor-pointer transition">
                    Blog
                  </li>
                  <li className="hover:text-indigo-400 cursor-pointer transition">
                    Events
                  </li>
                  <li className="hover:text-indigo-400 cursor-pointer transition">
                    Forums
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p>&copy; 2025 DevConnect. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-indigo-400 transition">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="flex flex-col h-auto">
      {/* main container */}
      <div className="md:grid w-[95%] h-auto md:grid-cols-4 gap-3 mx-auto">
        {/* first column */}
        <div className="col-span-1">
          <div className="md:flex md:flex-col md:gap-3 rounded-lg hidden">
            {/* profile container */}
            <UserInfo />

            <MutualPeople
              auth={auth}
              setAuth={setAuth}
              refreshPosts={fetchPosts}
            />
          </div>
        </div>

        {/* second column */}
        <div className="md:col-span-2 flex flex-col gap-6 sm:w-full">
          {/* welcome banner */}
          <WelcomeBanner />

          {/* blog-post-container  */}
          <Posts
            auth={auth}
            POST_URL={POST_URL}
            setAuth={setAuth}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            fetchPosts={fetchPosts}
            posts={posts}
            setPosts={setPosts}
          />
        </div>

        {/* third column */}
        <div className="hidden md:flex flex-col rounded-lg gap-3">
          {/* activity container */}
          <Activity />

          {/* Blogs container*/}
          <Blogs />

          {/* Events */}
          <Events />
        </div>
      </div>
    </div>
  );
};

export default DashboardLanding;
