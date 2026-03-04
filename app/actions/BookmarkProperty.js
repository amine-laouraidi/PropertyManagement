"use server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
async function BookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id Is Required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "bookmarked remove with success";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "bookmarked added with success";
    isBookmarked = true;
  }
  await user.save();
  revalidatePath("/properties/saved", "page");
  return {
    message,
    isBookmarked,
  };
}
export default BookmarkProperty;
