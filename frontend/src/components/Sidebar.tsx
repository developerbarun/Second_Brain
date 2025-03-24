import { Logo } from "../icons/Logo"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouTubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo/>
            </div>
                Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem icon = {<TwitterIcon/>} text="Twitter"/>
            <SidebarItem icon = {<YouTubeIcon/>} text="Youtube"/>
        </div>
    </div>
}