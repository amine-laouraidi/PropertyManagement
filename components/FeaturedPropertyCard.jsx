import Link from 'next/link';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
    else if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
    else if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow duration-200">
      <div className="relative md:w-2/5">
        <Image
          src={property.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full h-full min-h-[200px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
        />
        <span className="absolute top-3 left-3 bg-white text-amber-700 font-bold text-sm px-3 py-1 rounded-full shadow-sm">
          ${getRateDisplay()}
        </span>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
            {property.type}
          </span>
          <h3 className="text-xl font-bold text-stone-800 mt-1 mb-4">{property.name}</h3>

          <div className="flex gap-5 text-stone-500 text-sm mb-3">
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
              {property.square_feet}
              <span className="md:hidden lg:inline"> sqft</span>
            </span>
          </div>

          <div className="flex gap-3 text-xs text-emerald-700 mb-4">
            {property.rates.nightly && <span><FaMoneyBill className="inline mr-1" />Nightly</span>}
            {property.rates.weekly && <span><FaMoneyBill className="inline mr-1" />Weekly</span>}
            {property.rates.monthly && <span><FaMoneyBill className="inline mr-1" />Monthly</span>}
          </div>
        </div>

        <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-orange-700">
            <FaMapMarker />
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
};

export default FeaturedPropertyCard;
