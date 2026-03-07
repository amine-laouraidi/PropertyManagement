import FeaturedPropertyCard from '@/components/FeaturedPropertyCard';
import connectDB from '@/config/db';
import Property from '@/models/Property';

const FeaturedProperties = async () => {
  await connectDB();
  const properties = await Property.find({ is_featured: true }).lean();

  return properties.length > 0 ? (
    <section className="bg-amber-50 px-4 pt-8 pb-12">
      <div className="container-xl lg:container m-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
            Handpicked
          </span>
          <h2 className="text-3xl font-bold text-stone-800">Featured Properties</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
