import addProperty from "@/app/actions/addProperty";
import editProperty from "@/app/actions/editProperty";

export default function PropertyForm({ property = null }) {
  const isEdit = !!property;
  const editPropertyById = editProperty.bind(null, property?._id);

  const amenities = [
    "Wifi", "Full kitchen", "Washer & Dryer", "Free Parking",
    "Swimming Pool", "Hot Tub", "24/7 Security", "Wheelchair Accessible",
    "Elevator Access", "Dishwasher", "Gym/Fitness Center", "Air Conditioning",
    "Balcony/Patio", "Smart TV", "Coffee Maker",
  ];

  const inputClass = "border border-stone-200 rounded-xl w-full py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";
  const labelClass = "block text-sm font-semibold text-stone-700 mb-1.5";

  return (
    <form action={isEdit ? editPropertyById : addProperty} className="space-y-5">
      <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">
        {isEdit ? "Edit Property" : "Add Property"}
      </h2>

      {/* Type */}
      <div>
        <label htmlFor="type" className={labelClass}>Property Type</label>
        <select id="type" name="type" className={inputClass} required defaultValue={property?.type ?? "Apartment"}>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Name */}
      <div>
        <label className={labelClass}>Listing Name</label>
        <input type="text" id="name" name="name" className={inputClass} placeholder="e.g. Beautiful Apartment In Miami" required defaultValue={property?.name ?? ""} />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" className={inputClass} rows="4" placeholder="Add an optional description of your property" defaultValue={property?.description ?? ""} />
      </div>

      {/* Location */}
      <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl space-y-3">
        <label className="block text-sm font-bold text-amber-900 mb-2">Location</label>
        {["street", "city", "state", "zipcode"].map((field) => (
          <input
            key={field}
            type="text"
            id={field}
            name={`location.${field}`}
            className={inputClass}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required={field === "city" || field === "state"}
            defaultValue={property?.location?.[field] ?? ""}
          />
        ))}
      </div>

      {/* Beds / Baths / Sqft */}
      <div className="grid grid-cols-3 gap-4">
        {[["beds", "Beds"], ["baths", "Baths"], ["square_feet", "Square Feet"]].map(([id, label]) => (
          <div key={id}>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input type="number" id={id} name={id} className={inputClass} required defaultValue={property?.[id] ?? ""} />
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <label className={labelClass}>Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                className="accent-amber-600 w-4 h-4"
                defaultChecked={property?.amenities?.includes(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Rates */}
      <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
        <label className="block text-sm font-bold text-amber-900 mb-3">Rates (Leave blank if not applicable)</label>
        <div className="flex flex-col sm:flex-row gap-4">
          {[["weekly_rate", "rates.weekly", "Weekly", property?.rates?.weekly], ["monthly_rate", "rates.monthly", "Monthly", property?.rates?.monthly], ["nightly_rate", "rates.nightly", "Nightly", property?.rates?.nightly]].map(([id, name, label, val]) => (
            <div key={id} className="flex-1">
              <label htmlFor={id} className="block text-xs font-semibold text-stone-600 mb-1">{label}</label>
              <input type="number" id={id} name={name} className={inputClass} defaultValue={val ?? ""} />
            </div>
          ))}
        </div>
      </div>

      {/* Seller Info */}
      {[["seller_name", "seller_info.name", "text", "Seller Name", "Name", false], ["seller_email", "seller_info.email", "email", "Seller Email", "Email address", true], ["seller_phone", "seller_info.phone", "tel", "Seller Phone", "Phone", false]].map(([id, name, type, label, placeholder, req]) => (
        <div key={id}>
          <label htmlFor={id} className={labelClass}>{label}</label>
          <input type={type} id={id} name={name} className={inputClass} placeholder={placeholder} required={req} defaultValue={property?.seller_info?.[name.split(".")[1]] ?? ""} />
        </div>
      ))}

      {/* Images */}
      <div>
        <label htmlFor="images" className={labelClass}>Images (Select up to 4 images)</label>
        <input type="file" id="images" name="images" className="border border-stone-200 rounded-xl w-full py-2.5 px-3 text-sm text-stone-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 transition" accept="image/*" multiple required={!isEdit} />
      </div>

      <button
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-150 text-sm mt-2"
        type="submit"
      >
        {isEdit ? "Update Property" : "Add Property"}
      </button>
    </form>
  );
}
