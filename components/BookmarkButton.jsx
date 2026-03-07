"use client";
import BookmarkProperty from "@/app/actions/BookmarkProperty";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BookmarkButton({ propertyId, isBookmarked: initialBookmarked }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be logged in to save a bookmark");
      return;
    }
    try {
      const bookmark = await BookmarkProperty(propertyId);
      toast.success(bookmark.message);
      setIsBookmarked(bookmark.isBookmarked);
    } catch (error) {
      toast.error(error);
    }
  };

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors duration-150 text-sm"
    >
      <FaBookmark /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors duration-150 text-sm"
    >
      <FaBookmark /> Bookmark Property
    </button>
  );
}
