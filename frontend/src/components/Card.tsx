import toast from "react-hot-toast";
import { ShareIcon } from "../icons/ShareIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { VideoIcon } from "../icons/VideoIcon";
import { ArticleIcon } from "../icons/ArticleIcon";
import { AudioIcon } from "../icons/AudioIcon";
import { ImageIcon } from "../icons/ImageIcon";

interface CardProps {
  title: string;
  link: string;
  type?: string;
}

export function Card({ title, link, type }: CardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard 📋");
    } catch {
      toast.error("Failed to copy link ❌");
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <VideoIcon />;
      case "article":
        return <ArticleIcon />;
      case "audio":
        return <AudioIcon />;
      case "image":
        return <ImageIcon />;
      default:
        return <LinkIcon />;
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden w-72">
      <div className="flex justify-between items-center p-3">
        {/* Left: icon + title */}
        {/* <div className="flex items-center gap-2 min-w-0">
        <div className="text-indigo-600 flex-shrink-0">{getTypeIcon()}</div>
        <span className="font-medium text-gray-800 truncate">{title}</span>
      </div> */}

        <div className="flex items-center gap-2 min-w-0">
          <div className="text-indigo-600 flex-shrink-0">{getTypeIcon()}</div>
          <span className="font-medium text-gray-800 break-words whitespace-normal">
            {title}
          </span>
        </div>

        {/* Right: open + copy */}
        <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600"
            title="Open link"
          >
            <LinkIcon size={16} />
          </a>
          <button
            onClick={handleCopy}
            className="hover:text-green-600 transition"
            title="Copy link"
          >
            <ShareIcon size="md" />
          </button>
        </div>
      </div>

      {/* Content preview */}
      <div className="w-full h-auto overflow-hidden bg-gray-50">
        {type === "video" && (
          <iframe
            className="w-full aspect-video"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {type === "article" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "image" && (
          <img
            src={link}
            alt={title}
            className="w-full object-cover aspect-video"
          />
        )}

        {type === "audio" && link}

      </div>
    </div>
  );
}
