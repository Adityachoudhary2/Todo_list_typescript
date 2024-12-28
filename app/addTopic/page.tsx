"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          title, 
          description,
          createdAt: new Date(),
          updatedAt: new Date()
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add topic");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Topic</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 px-4 py-2 rounded-md"
          required
        />
        <textarea
          placeholder="Topic Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-slate-300 px-4 py-2 rounded-md h-32"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:bg-slate-400"
        >
          {loading ? "Adding..." : "Add Topic"}
        </button>
      </form>
    </div>
  );
}