"use server";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export default async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id Is required");
  }
  const { userId } = sessionUser;
  const message = await Message.findById(messageId);
  if(message.recipient.toString() !== userId){
    throw new Error("Unathorized");
  }
  message.read = !message.read;
  revalidatePath('/messages','page');

  await message.save();

  return message.read;

}
