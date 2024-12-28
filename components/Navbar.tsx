import Link from "next/link";
import { ListTodo } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-4">
      <Link href="/" className="text-white font-bold flex items-center gap-2">
        <ListTodo className="h-6 w-6" />
        <span>Todo List</span>
      </Link>
      <Link
        href="/addTopic"
        className="bg-white px-4 py-2 rounded-md hover:bg-slate-100 transition-colors"
      >
        Add Topic
      </Link>
    </nav>
  );
}