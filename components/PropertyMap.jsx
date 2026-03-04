"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
import { FaLocationDot } from "react-icons/fa6";

const markerIcon = L.icon({
  iconUrl: pin.src,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function PropertyMap({ location }) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;

    const geocode = async () => {
      try {
        setLoading(true);
        const { street, city, state, zipcode } = location;

        const params = new URLSearchParams({
          key: process.env.NEXT_PUBLIC_LOCATIONIQ_KEY,
          street,
          city,
          state,
          postalcode: zipcode,
          country: "us",
          format: "json",
          limit: "1",
        });

        const res = await fetch(`https://us1.locationiq.com/v1/search?${params}`);
        if (!res.ok) throw new Error("Geocoding failed");

        const data = await res.json();

        if (data?.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            displayName: data[0].display_name,
          });
        } else {
          setError("Address not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    geocode();
  }, [location]);

  if (loading) return <Spinner loading={loading} />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!coords) return null;

  const googleMapsUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://locationiq.com">LocationIQ</a>'
            url={`https://tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}`}
          />
          <Marker position={[coords.lat, coords.lng]} icon={markerIcon}>
            <Popup>{coords.displayName}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition w-fit"
      >
        <FaLocationDot />
        View on Google Maps
      </a>
    </div>
  );
}