import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { ShareIcon } from "../icons/ShareIcon";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import toast from "react-hot-toast";
import { Moon, Sun } from "lucide-react";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { contents, refresh } = useContent();
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/signin";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
          { headers: { Authorization: token } }
        );
        if (res.data?.username) {
          setUsername(res.data.username);
        }
      } catch (err) {
        console.warn("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const shareUrl = `${window.location.origin}/brain/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard 📋");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate share link ❌");
    }
  };

  const filteredContents =
    activeFilter === "all"
      ? contents
      : contents.filter((item: any) => item.type === activeFilter);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <div className="flex-1 ml-72">
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-sm">
          <h1 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            My Brain 🧠
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Hi, {username} 👋
            </span>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            <Button
              varient="secondary"
              text="Logout"
              size="sm"
              onClick={handleLogout}
            />
          </div>
        </header>

        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
        />

        {/* Add & Share */}
        <div className="flex justify-end gap-3 px-6 py-4">
          <Button
            varient="primary"
            size="md"
            onClick={() => setModelOpen(true)}
            text="Add Content"
            startIcon={<PlusIcon size="md" />}
          />
          <Button
            onClick={handleShare}
            varient="secondary"
            size="md"
            text="Share"
            startIcon={<ShareIcon size="md" />}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6 p-6">
          {filteredContents.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 italic col-span-full">
              No content yet. Add something!
            </div>
          ) : (
            filteredContents.map(({ title, link, type }: any, index: number) => (
              <Card key={index} type={type} link={link} title={title} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
