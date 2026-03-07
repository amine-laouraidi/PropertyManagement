import React from "react";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import connectDB from "@/config/db";
import Property from "@/models/Property";

export default async function HomeProperties() {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className="px-4 py-10">
        <div className="container xl:container m-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
              Just Listed
            </span>
            <h2 className="text-3xl font-bold text-stone-800">Recent Properties</h2>
          </div>
          {recentProperties.length === 0 ? (
            <p className="text-center text-stone-500">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-sm my-8 px-6">
        <Link
          href="/properties"
          className="block bg-amber-700 hover:bg-amber-800 text-white text-center py-3.5 px-6 rounded-xl font-semibold transition-colors duration-150 shadow-sm"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}
