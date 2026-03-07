"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessages from "./UnreadMessages";

export default function Navbar() {
  const { data: session, status } = useSession();
  const profileImage = session?.user?.image;
  const [isMobileOpenMenu, setIsMobileOpenMenu] = useState(false);
  const [isProfileOpenMenu, setIsProfileOpenMenu] = useState(false);
  const [providers, setProviders] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setAuthProviders();
  }, []);

  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-amber-800 border-b border-amber-700 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-amber-200 hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileOpenMenu((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />
              <span className="hidden md:block text-amber-50 text-2xl font-bold ml-2 tracking-tight">
                PropertyPulse
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:ml-8 md:block">
              <div className="flex space-x-1">
                <Link
                  href="/"
                  className={`${pathName === "/" ? "bg-amber-900 text-white" : "text-amber-100"} hover:bg-amber-700 hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${pathName === "/properties" ? "bg-amber-900 text-white" : "text-amber-100"} hover:bg-amber-700 hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`${pathName === "/properties/add" ? "bg-amber-900 text-white" : "text-amber-100"} hover:bg-amber-700 hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Logged Out */}
          {status !== "loading" && !session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      key={index}
                      onClick={() => signIn(provider.id)}
                      className="flex items-center gap-2 text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150"
                    >
                      <FaGoogle className="text-amber-700" />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Right Side - Logged In */}
          {status !== "loading" && session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 gap-2">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-amber-700 p-2 text-amber-200 hover:text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors duration-150"
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>
                <UnreadMessages />
              </Link>

              {/* Profile dropdown */}
              <div ref={profileMenuRef} className="relative ml-1">
                <button
                  type="button"
                  className="relative flex rounded-full ring-2 ring-amber-400 hover:ring-amber-200 focus:outline-none transition-all duration-150"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileOpenMenu((prev) => !prev)}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-9 w-9 rounded-full object-cover"
                    src={profileImage || profileDefault}
                    width={40}
                    height={40}
                    alt=""
                  />
                </button>

                {isProfileOpenMenu && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-amber-100 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => setIsProfileOpenMenu(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => setIsProfileOpenMenu(false)}
                    >
                      Saved Properties
                    </Link>
                    <div className="border-t border-amber-100 mt-1 pt-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => { setIsProfileOpenMenu(false); signOut(); }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpenMenu && (
        <div id="mobile-menu" className="border-t border-amber-700">
          <div className="space-y-1 px-3 pb-4 pt-3">
            <Link
              href="/"
              className={`${pathName === "/" ? "bg-amber-900 text-white" : "text-amber-100"} block rounded-lg px-3 py-2 text-base font-medium hover:bg-amber-700 hover:text-white transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${pathName === "/properties" ? "bg-amber-900 text-white" : "text-amber-100"} block rounded-lg px-3 py-2 text-base font-medium hover:bg-amber-700 hover:text-white transition-colors`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`${pathName === "/properties/add" ? "bg-amber-900 text-white" : "text-amber-100"} block rounded-lg px-3 py-2 text-base font-medium hover:bg-amber-700 hover:text-white transition-colors`}
              >
                Add Property
              </Link>
            )}
            {!session ? (
              <button className="flex items-center gap-2 text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg px-3 py-2 mt-2 text-sm font-semibold w-full transition-colors">
                <FaGoogle />
                <span>Login or Register</span>
              </button>
            ) : (
              <button
                className="block w-full text-left px-3 py-2 text-sm text-red-300 hover:text-red-200 font-medium transition-colors"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
