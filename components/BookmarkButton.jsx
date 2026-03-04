"use client";
import BookmarkProperty from "@/app/actions/BookmarkProperty";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BookmarkButton({ propertyId,isBookmarked: initialBookmarked }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked,setIsBookmarked] = useState(initialBookmarked);
  const handleClick = async () => {
    if (!userId) {
      toast.error("you need to be logged in to save bookmark");
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

  return isBookmarked ?(
    
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
}
