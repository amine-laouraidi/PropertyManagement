"use server";

import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function getUnreadMessageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id Is required");
  }
  const { userId } = sessionUser;
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return { count };
}