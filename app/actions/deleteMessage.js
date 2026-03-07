"use server"
import connectDB from '@/config/db';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache';

 export default async function deleteMessage(messageId) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User Id Is Required');
    }
    const {userId} = sessionUser;

    const message = await Message.findById(messageId);
    if(!message) throw new Error("Message Not Found");
    if(message.recipient.toString() !== userId)  throw new Error("Unathorized");

    await message.deleteOne();
    revalidatePath('/messages','page');
    return {success:true};
}