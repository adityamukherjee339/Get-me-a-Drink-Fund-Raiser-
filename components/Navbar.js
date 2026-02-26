"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    // Added state to manage dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className='bg-[#002244] text-white flex justify-between h-16 items-center px-7'>
            <div className="logo font-bold text-lg flex justify-center items-center gap-3">
                <span>
                    <img src="drink.gif" alt="GetMeaDrink Logo" width={55} className='rounded-2xl' />
                </span> 
                GetMeaDrink
            </div>

            <div className='flex items-center gap-3'>
                {session && (
                    // Added 'relative' to the parent wrapper so the absolute dropdown positions correctly
                    <div className="relative inline-block text-left">
                        <button
                            id="dropdownDefaultButton"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                            type="button"
                        >
                            Menu
                            <svg
                                className={`w-4 h-4 ms-1.5 -me-0.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 9-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Conditionally render dropdown based on state */}
                        {isDropdownOpen && (
                            <div
                                id="dropdown"
                                className="absolute right-0 z-10 mt-2 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 bg-[#002244]"
                            >
                                <ul className="p-2 text-sm font-medium" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/settings" className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/earnings" className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded">
                                            Earnings
                                        </Link>
                                    </li>
                                    <li>
                                        {/* Changed this to a button to trigger the NextAuth signOut */}
                                        <button 
                                            onClick={() => signOut()}
                                            className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded text-left"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Standalone Dashboard Button */}
                {session && (
                    <Link href={"/dashboard"}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-2xl">
                            Dashboard
                        </button>
                    </Link>
                )}

                {/* Standalone Logout Button */}
                {session && (
                    <button type="button" onClick={() => signOut()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-2xl">
                        Logout
                    </button>
                )}

                {/* Login Button (when logged out) */}
                {!session && (
                    <Link href={"/login"}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-2xl">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;