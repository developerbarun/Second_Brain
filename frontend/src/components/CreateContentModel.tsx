import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";

enum ContentType {
  Image = "image",
  Video = "video",
  Article = "article",
  Audio = "audio",
}

export const CreateContentModel = ({ open, onClose = () => {} }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Video);

  async function addContent() {
    try {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
        { title, link, type },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      onClose();
    } catch (error) {
    //   console.error("Failed to add content:", error);
      alert("Failed to add content. Please try again." + error);
    }
  }

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Close button */}
        <div className="flex justify-end">
          <div onClick={onClose} className="cursor-pointer">
            <CrossIcon />
          </div>
        </div>

        {/* Inputs */}
        <div>
          <Input reference={titleRef} placeholder="Title" />
          <Input reference={linkRef} placeholder="Link" />
        </div>

        {/* Type Selection */}
        <div>
          <h1 className="text-lg font-semibold pb-2">Types</h1>
          <div className="flex gap-2 justify-center pb-2">
            {Object.values(ContentType).map((item) => (
              <Button
                key={item}
                text={item}
                size="md"
                varient={type === item ? "primary" : "secondary"}
                onClick={() => setType(item)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button varient="primary" text="Submit" size="md" onClick={addContent} />
        </div>
      </div>
    </div>
  ) : null;
};
