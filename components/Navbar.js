"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className='bg-[#002244] text-white h-16 flex items-center px-5 md:px-7 relative'>

            {/* Logo */}
            <div className="flex-1">
                <Link href="/" className="font-bold text-lg flex items-center gap-2">
                    <img src="/drink.gif" alt="GetMeaDrink Logo" width={45} className='rounded-2xl' />
                    <span className="hidden sm:inline">GetMeaDrink</span>
                </Link>
            </div>

            {/* Desktop Nav */}
            <div className='hidden md:flex items-center gap-3'>
                {session && (
                    <div className="relative inline-block text-left">
                        <button
                            id="dropdownDefaultButton"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            onBlur={() => { setTimeout(() => setIsDropdownOpen(false), 150); }}
                            className="inline-flex items-center justify-center text-white border border-white/20 hover:bg-white/10 font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                            type="button"
                        >
                            Welcome {session.user.name}
                            <svg
                                className={`w-4 h-4 ms-1.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 z-20 mt-2 bg-[#002244] border border-white/10 rounded-lg shadow-lg w-44">
                                <ul className="p-2 text-sm font-medium">
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded"
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${session.user.username || session.user.name}`}
                                            className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded"
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            Your Page
                                        </Link>
                                    </li>
                                    <li>
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

                {session && (
                    <button
                        type="button"
                        onClick={() => signOut()}
                        className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:opacity-90 font-medium text-sm px-4 py-2.5 rounded-2xl"
                    >
                        Logout
                    </button>
                )}

                {!session && (
                    <Link href="/login">
                        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:opacity-90 font-medium text-sm px-4 py-2.5 rounded-2xl">
                            Login
                        </button>
                    </Link>
                )}
            </div>

            {/* Mobile: Hamburger */}
            <div className="flex md:hidden items-center gap-2">
                {!session && (
                    <Link href="/login">
                        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 font-medium text-xs px-3 py-2 rounded-xl">
                            Login
                        </button>
                    </Link>
                )}
                {session && (
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-white/10 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && session && (
                <div className="absolute top-16 left-0 right-0 bg-[#002244] border-t border-white/10 z-30 shadow-xl">
                    <div className="p-4 flex flex-col gap-1">
                        <p className="text-slate-400 text-xs pb-2 border-b border-white/10">
                            Signed in as <span className="text-white font-bold">{session.user.name}</span>
                        </p>
                        <Link
                            href="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-3 hover:bg-white/10 rounded-lg font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={`/${session.user.username || session.user.name}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-3 hover:bg-white/10 rounded-lg font-medium"
                        >
                            Your Page
                        </Link>
                        <button
                            onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                            className="p-3 hover:bg-white/10 rounded-lg font-medium text-left text-red-400"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;