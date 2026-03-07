import MessageCard from "@/components/MessageCard";
import { convertToSerializableObject } from "@/config/convertToObject";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { notFound } from "next/navigation";

export default async function MessagePage() {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!userId) {
    notFound();
  }

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();
  const messages = [...readMessages,...unreadMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });


  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {messages.length === 0 ? (
            <p className="text-gray-500">You have no messages.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageCard message={message} key={message._id}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
