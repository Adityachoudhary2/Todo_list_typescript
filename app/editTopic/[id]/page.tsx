"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTopic({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/topics/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch topic");
        const data = await res.json();
        setTitle(data.topic.title);
        setDescription(data.topic.description);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load topic");
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/topics/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to update topic");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 px-4 py-2 rounded-md"
        />
        <textarea
          placeholder="Topic Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-slate-300 px-4 py-2 rounded-md h-32"
        />
        <button
          type="submit"
          className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          Update Topic
        </button>
      </form>
    </div>
  );
}