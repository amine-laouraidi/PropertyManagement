import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/db";
import Property from "@/models/Property";

const PropertiesPage = async ({ searchParams }) => {
  const { page = 1, pageSize = 2 } = await searchParams;
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find().skip(skip).limit(pageSize).lean();

  return (
    <section className="px-4 py-6">
      <div className="container xl:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination page={Number(page)} pageSize={Number(pageSize)} totalItems={total} />
      </div>
    </section>
  );
};

export default PropertiesPage;
