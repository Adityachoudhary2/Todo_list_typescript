"use client";

import { useEffect, useState } from "react";
import { Topic } from "@/models/topic";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/topics");
        if (!res.ok) throw new Error("Failed to fetch topics");
        const data = await res.json();
        setTopics(data.topics);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load topics");
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete topic");
      setTopics(topics.filter((topic) => topic._id?.toString() !== id));
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="my-8">
      {topics.length === 0 ? (
        <div className="text-center text-gray-500">No topics found. Add one to get started!</div>
      ) : (
        topics.map((topic) => (
          <div
            key={topic._id?.toString()}
            className="p-4 border border-slate-300 my-3 flex justify-between items-center rounded-lg bg-white shadow-sm"
          >
            <div>
              <h2 className="font-bold text-2xl">{topic.title}</h2>
              <p>{topic.description}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/editTopic/${topic._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={24} />
              </Link>
              <button
                onClick={() => handleDelete(topic._id?.toString() || "")}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}