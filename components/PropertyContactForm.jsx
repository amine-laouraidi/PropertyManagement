"use client";
import addMessage from "@/app/actions/addMessage";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

export default function PropertyContactForm({ property }) {
  const { data: session, status } = useSession();
  const [state, formAction, pending] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success("Your Message Has Been Sent");
  }, [state]);

  if (status === "loading") {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center">
        <Spinner loading={true} />
      </div>
    );
  }

  if (state.submitted) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-5 py-4 rounded-2xl text-sm font-medium">
        ✓ Your message has been sent successfully!
      </div>
    );
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="text-xl font-bold text-stone-800 mb-6">Contact Property Manager</h3>
        <form action={formAction} className="space-y-4">
          <input type="hidden" id="property" name="property" defaultValue={property._id} />
          <input type="hidden" id="recipient" name="recipient" defaultValue={property.owner} />

          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5 capitalize" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                className="w-full border border-stone-200 rounded-xl py-2.5 px-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                id={field}
                name={field}
                type={field === "email" ? "email" : field === "phone" ? "text" : "text"}
                placeholder={`Enter your ${field}`}
                required={field !== "phone"}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="body">
              Message:
            </label>
            <textarea
              className="w-full border border-stone-200 rounded-xl py-2.5 px-3 text-stone-800 text-sm h-36 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              id="body"
              name="body"
              placeholder="Enter your message"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-150 text-sm disabled:opacity-60"
          >
            {pending ? (
              <><FaSpinner className="animate-spin" /> Sending...</>
            ) : (
              <><FaPaperPlane /> Send Message</>
            )}
          </button>
        </form>
      </div>
    )
  );
}
