import Link from "next/link";
import React from "react";

export default function InfoBox({
  heading,
  backgroundColor = "bg-stone-100",
  textColor = "text-stone-800",
  children,
  buttonInfo,
}) {
  return (
    <div className={`${backgroundColor} p-8 rounded-2xl shadow-sm border border-stone-100`}>
      <h2 className={`${textColor} text-2xl font-bold mb-2`}>{heading}</h2>
      <p className="mt-2 mb-6 text-stone-600 leading-relaxed">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity duration-150`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}
