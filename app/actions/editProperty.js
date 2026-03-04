"use server";

import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function editProperty(propertyId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id Is required");
  }
  const { userId } = sessionUser;
  const amenities = formData.getAll("amenities");
  const propertyData = {
    owner: userId,
    name: formData.get("name"),
    type: formData.get("type"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData,
  );
  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
export default editProperty;
