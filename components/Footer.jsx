import Image from "next/image";
import React from "react";
import logo from '@/assets/images/logo.png';
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-300 py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div>
          <Image src={logo} alt="Logo" className="h-8 w-auto opacity-90" />
        </div>
        <ul className="flex space-x-6 text-sm">
          <li>
            <Link href="/properties" className="hover:text-amber-400 transition-colors duration-150">Properties</Link>
          </li>
          <li>
            <a  className="hover:text-amber-400 transition-colors duration-150">Terms of Service</a>
          </li>
        </ul>
        <p className="text-sm text-stone-500">
          &copy; {currentYear} PropertyPulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}