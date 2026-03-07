import React from "react";
import InfoBox from "./InfoBox";

export default function InfoBoxes() {
  return (
    <section className="py-6">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-amber-50"
            textColor="text-amber-900"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-amber-700",
            }}
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-stone-50"
            textColor="text-stone-900"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-stone-700",
            }}
          >
            List your properties and reach potential tenants. Rent as an Airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}
