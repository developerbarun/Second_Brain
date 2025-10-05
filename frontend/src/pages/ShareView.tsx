import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";

interface Content {
  _id?: string;
  title: string;
  link: string;
  type: string;
}

export function ShareView() {
  const { shareLink } = useParams();
  const [username, setUsername] = useState<string>("");
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedContent() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/${shareLink}`
        );
        setUsername(response.data.username);
        setContents(response.data.content);
      } catch (err) {
        console.error(err);
        setError("Unable to load shared content. Link may be invalid or expired.");
      } finally {
        setLoading(false);
      }
    }
    fetchSharedContent();
  }, [shareLink]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading shared content...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Shared by <span className="text-blue-600">{username}</span>
        </h1>
        {contents.length === 0 ? (
          <p className="text-gray-500 text-lg">No shared content available.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {contents.map((item, idx) => (
              <Card key={idx} type={item.type} link={item.link} title={item.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareView;
