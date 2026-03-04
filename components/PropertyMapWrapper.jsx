"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-400 animate-pulse">Loading map...</div>,
});

export default function PropertyMapWrapper({ location }) {
  return <PropertyMap location={location} />;
}