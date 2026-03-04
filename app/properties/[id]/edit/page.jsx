import PropertyForm from "@/components/PropertyForm";
import { convertToSerializableObject } from "@/config/convertToObject";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import React from "react";

export default async function PropertyEditPage({ params }) {
  await connectDB();
  const { id } = await params;
  const propertyData = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyData);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyForm property={property}/>
        </div>
      </div>
    </section>
  );
}
