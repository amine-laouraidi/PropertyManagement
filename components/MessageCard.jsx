"use client";
import deleteMessage from "@/app/actions/deleteMessage";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MessageCard({ message }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => read ? prevCount - 1 : prevCount + 1);
    toast.success(`Marked As ${read ? "Read" : "New"}`);
  };

  const handleDelete = async () => {
    const result = await deleteMessage(message._id);
    if (result.success) {
      setUnreadCount((prevCount) => isRead ? prevCount : prevCount - 1);
      setIsDeleted(true);
      toast.success("Message Deleted");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
      {!isRead && (
        <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          New
        </span>
      )}

      <h2 className="text-lg font-bold text-stone-800 mb-3 pr-16">
        <span className="text-amber-700">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>

      <p className="text-stone-600 mb-4 leading-relaxed">{message.body}</p>

      <ul className="space-y-1 text-sm text-stone-600 mb-5">
        <li><span className="font-semibold text-stone-700">Name:</span> {message.name}</li>
        <li>
          <span className="font-semibold text-stone-700">Email:</span>{" "}
          <a href={`mailto:${message.email}`} className="text-amber-700 hover:underline">{message.email}</a>
        </li>
        <li>
          <span className="font-semibold text-stone-700">Phone:</span>{" "}
          <a href={`tel:${message.phone}`} className="text-amber-700 hover:underline">{message.phone}</a>
        </li>
        <li>
          <span className="font-semibold text-stone-700">Received:</span>{" "}
          {new Date(message.createdAt).toLocaleString("en-US")}
        </li>
      </ul>

      <div className="flex gap-2">
        <button
          onClick={handleClick}
          className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors duration-150"
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors duration-150"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
