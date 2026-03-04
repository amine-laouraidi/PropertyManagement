import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import { convertToSerializableObject } from "@/config/convertToObject";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);
  if (!property) {
    return <h1>Not Found</h1>;
  }
  
  const {userId} = await getSessionUser();

  let isBookmarked = false;
  if (userId) {
    const user = await User.findById(userId).lean();
    isBookmarked =
      user?.bookmarks?.some(
        (bookmark) => bookmark.toString() === property._id.toString(),
      ) ?? false;
  }
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />

            <aside className="space-y-4">
              <BookmarkButton
                isBookmarked={isBookmarked}
                propertyId={property._id}
              />
              <ShareButtons />

              {/* <!-- Contact Form --> */}
              <PropertyContactForm />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}
