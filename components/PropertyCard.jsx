import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaLocationDot,
} from "react-icons/fa6";

export default function PropertyCard({ property }) {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <Link href={`/properties/${property._id}`}>
          <Image
            src={property.images[0]}
            alt={property.name}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-52 object-cover"
          />
        </Link>
        <span className="absolute top-3 right-3 bg-white text-amber-700 font-bold text-sm px-3 py-1 rounded-full shadow-sm">
          {getRateDisplay()}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
            {property.type}
          </span>
          <h3 className="text-lg font-bold text-stone-800 mt-1">{property.name}</h3>
        </div>

        <div className="flex gap-4 text-stone-500 text-sm mb-3">
          <span className="flex items-center gap-1">
            <FaBed className="text-amber-600" /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </span>
          <span className="flex items-center gap-1">
            <FaBath className="text-amber-600" /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </span>
          <span className="flex items-center gap-1">
            <FaRulerCombined className="text-amber-600" />
            {property.square_feet.toLocaleString()}
            <span className="md:hidden lg:inline"> sqft</span>
          </span>
        </div>

        <div className="flex gap-3 text-xs text-emerald-700 mb-4">
          {property.rates.weekly && (
            <span className="flex items-center gap-1">
              <FaMoneyBill /> Weekly
            </span>
          )}
          {property.rates.monthly && (
            <span className="flex items-center gap-1">
              <FaMoneyBill /> Monthly
            </span>
          )}
        </div>

        <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-orange-700">
            <FaLocationDot />
            {property.location.city}, {property.location.state}
          </span>
          <Link
            href={`/properties/${property._id}`}
            className="bg-amber-700 hover:bg-amber-800 text-white text-sm px-4 py-1.5 rounded-lg transition-colors duration-150"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
