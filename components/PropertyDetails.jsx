import {
  FaLocationDot,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import PropertyMapWrapper from "./PropertyMapWrapper";

export default function PropertyDetails({ property }) {
  return (
    <main className="space-y-5">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center md:text-left">
        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-amber-600 bg-amber-50 px-2 py-0.5 rounded mb-2">
          {property.type}
        </span>
        <h1 className="text-3xl font-bold text-stone-800 mb-3">{property.name}</h1>
        <div className="flex items-center justify-center md:justify-start gap-2 text-orange-700 text-sm">
          <FaLocationDot />
          <span>
            {property.location.street}, {property.location.city},{" "}
            {property.location.state} {property.location.zipcode}
          </span>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4">Rates & Options</h3>
          <div className="grid grid-cols-3 divide-x divide-stone-100">
            {["nightly", "weekly", "monthly"].map((period) => (
              <div key={period} className="flex flex-col items-center py-3 px-2">
                <span className="text-xs text-stone-500 font-medium capitalize mb-1">{period}</span>
                <span className="text-xl font-bold text-stone-800">
                  {property.rates[period] ? (
                    `$${property.rates[period].toLocaleString()}`
                  ) : (
                    <FaXmark className="text-red-400 text-base" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Description & Details</h3>
        <div className="flex justify-center gap-8 text-amber-700 text-sm mb-4">
          <span className="flex items-center gap-1.5">
            <FaBed /> {property.beds} <span className="hidden sm:inline">Beds</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath /> {property.baths} <span className="hidden sm:inline">Baths</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FaRulerCombined /> {property.square_feet.toLocaleString()}
            <span className="hidden sm:inline"> sqft</span>
          </span>
        </div>
        <p className="text-stone-600 leading-relaxed text-sm">{property.description}</p>
      </div>

      {/* Amenities */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Amenities</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {property.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-stone-700">
              <FaCheck className="text-amber-600 flex-shrink-0" />
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Location</h3>
        <PropertyMapWrapper location={property.location} />
      </div>
    </main>
  );
}
