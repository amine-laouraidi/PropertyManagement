"use client";
import deleteProperty from "@/app/actions/deleteProperty";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileProperties({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperpty = async (propertyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;
    await deleteProperty(propertyId);
    const updatedProperties = properties.filter((property) => property._id !== propertyId);
    setProperties(updatedProperties);
    toast.success("Property deleted successfully");
  };

  return properties.length > 0 ? (
    <div className="space-y-6">
      {properties.map((property) => (
        <div key={property._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col sm:flex-row">
          <Link href={`/properties/${property._id}`} className="sm:w-48 flex-shrink-0">
            <Image
              className="h-40 sm:h-full w-full object-cover"
              src={property.images[0]}
              width={200}
              height={160}
              alt={property.name}
            />
          </Link>
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <p className="text-lg font-bold text-stone-800">{property.name}</p>
              <p className="text-sm text-stone-500 mt-1">{property.location?.street}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/properties/${property._id}/edit`}
                className="bg-amber-700 hover:bg-amber-800 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-150"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteProperpty(property._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-150"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12 text-stone-500">
      <p className="text-lg">No properties found.</p>
    </div>
  );
}
