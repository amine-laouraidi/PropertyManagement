import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section className="w-full">
      <div className="container-xl m-auto">
        <Image
          src={image}
          alt=""
          className="object-cover h-[380px] w-full"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
