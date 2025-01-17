import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-4 py-5">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-300"
            >
              <span className="text-blue-400">MERN</span>
              Holidays
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-blue-200 transition-colors duration-300"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink to="/destinations">Destinations</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              {isLoggedIn ? (
                <div className="flex items-center space-x-6">
                  <NavLink to="/my-bookings">My Bookings</NavLink>
                  <NavLink to="/my-hotels">My Hotels</NavLink>
                  <div className="pl-6 border-l border-blue-700">
                    <SignOutButton />
                  </div>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="px-6 py-2.5 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-blue-900 transform transition-transform duration-300 ease-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-white p-2 hover:text-blue-200 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Navigation */}
          <nav className="flex flex-col px-6 py-16 space-y-4">
            <MobileNavLink to="/" onClick={() => setSidebarOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/destinations" onClick={() => setSidebarOpen(false)}>Destinations</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setSidebarOpen(false)}>About Us</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setSidebarOpen(false)}>Contact</MobileNavLink>

            <div className="pt-6 mt-6 border-t border-blue-700">
              {isLoggedIn ? (
                <>
                  <MobileNavLink to="/my-bookings" onClick={() => setSidebarOpen(false)}>My Bookings</MobileNavLink>
                  <MobileNavLink to="/my-hotels" onClick={() => setSidebarOpen(false)}>My Hotels</MobileNavLink>
                  <div className="pt-4">
                    <SignOutButton />
                  </div>
                </>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setSidebarOpen(false)}
                  className="block w-full px-6 py-3 text-center rounded-full bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-colors duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-gray-200 hover:text-white font-medium transition-colors duration-300"
  >
    {children}
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-200 hover:text-white text-lg font-medium transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Header;