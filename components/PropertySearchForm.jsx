"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropertySearchForm() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const router = useRouter();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (location === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSumbit}
      className="mt-4 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center gap-2"
    >
      <div className="w-full md:w-3/5">
        <label htmlFor="location" className="sr-only">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location (City, State, Zip...)"
          className="w-full px-4 py-3 rounded-xl bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm text-sm"
        />
      </div>
      <div className="w-full md:w-2/5">
        <label htmlFor="property-type" className="sr-only">Property Type</label>
        <select
          id="property-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm text-sm"
        >
          <option value="All">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 rounded-xl bg-amber-900 text-white font-semibold hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-150 text-sm shadow-sm"
      >
        Search
      </button>
    </form>
  );
}
