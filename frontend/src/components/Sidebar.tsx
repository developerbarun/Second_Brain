import { Logo } from "../icons/Logo";

interface SidebarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const Sidebar = ({ activeFilter, setActiveFilter }: SidebarProps) => {
  const filters = [
    { label: "All", type: "all" },
    { label: "YouTube", type: "video" },
    { label: "Twitter", type: "article" },
    { label: "Audio", type: "audio" },
    { label: "Image", type: "image" },
    { label: "Text", type: "text" },
  ];

  return (
    <div className="h-screen w-72 fixed top-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          <div className="pr-2">
            <Logo />
          </div>
          My Brain
        </div>

        <div className="pt-10 space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.type}
              onClick={() => setActiveFilter(filter.type)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === filter.type
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-400 text-sm mt-auto">
        © 2025 Second Brain
      </p>
    </div>
  );
};


// import { useNavigate } from "react-router-dom";
// import { Logo } from "../icons/Logo";
// import { TwitterIcon } from "../icons/TwitterIcon";
// import { YouTubeIcon } from "../icons/YoutubeIcon";
// import { Button } from "./Button";
// import { SidebarItem } from "./SidebarItem";

// export const Sidebar = () => {
//     const navigate = useNavigate();

//     const logoutHandler = () => {
//         localStorage.removeItem("token"); 
//         navigate("/signin");
//     };

//     return (
//         <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6">
//             <div className="flex text-2xl pt-8 items-center">
//                 <div className="pr-2 text-purple-600">
//                     <Logo />
//                 </div>
//                 Brainly
//             </div>
//             <div className="pt-8 pl-4">
//                 <SidebarItem icon={<TwitterIcon />} text="Twitter" />
//                 <SidebarItem icon={<YouTubeIcon />} text="YouTube" />
//             </div>
//             <div className="pt-6">
//                 <Button varient="primary" size="md" text="Logout" onClick={logoutHandler} />
//             </div>

//         </div>
//     );
// };
