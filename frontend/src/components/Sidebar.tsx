import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token"); 
        navigate("/signin");
    };

    return (
        <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Logo />
                </div>
                Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarItem icon={<TwitterIcon />} text="Twitter" />
                <SidebarItem icon={<YouTubeIcon />} text="YouTube" />
            </div>
            <div className="pt-6">
                <Button varient="primary" size="md" text="Logout" onClick={logoutHandler} />
            </div>

        </div>
    );
};
