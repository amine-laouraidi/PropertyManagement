"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export default function PropertyImages({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Gallery id="property-gallery">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 rounded-xl overflow-hidden">
            {images.map((src, i) => (
              <Item
                key={i}
                original={src}
                thumbnail={src}
                width={1600}
                height={1067}
                alt={`Property image ${i + 1}`}
              >
                {({ ref, open }) => (
                  <div
                    className={`relative cursor-zoom-in overflow-hidden rounded-lg ${
                      i === 0 ? "col-span-2 row-span-2 h-[400px]" : "h-[190px]"
                    }`}
                    onClick={open}
                  >
                    <Image
                      ref={ref}
                      src={src}
                      alt={`Property image ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </Item>
            ))}
          </div>
        </Gallery>
      </div>
    </section>
  );
}