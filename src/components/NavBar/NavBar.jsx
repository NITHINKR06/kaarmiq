'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaHome, FaInfoCircle, FaCogs, FaDollarSign, FaPhone, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import axios from 'axios'; // To make HTTP requests
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // For logout confirmation modal
  const [user, setUser] = useState({}); // To store user data
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data.data); // Assuming response.data.data contains user info
      } catch (error) {
        console.log('Error fetching user data:', { error: error.message });
        toast.error('User not found');
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu visibility
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open modal when logout button is clicked
  };

  const handleConfirmLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      setIsModalOpen(false); // Close the modal
      router.push('/auth/signin'); // Redirect to login page
    } catch (error) {
      console.log({ error: error.message });
      toast.error(error.message);
      setIsModalOpen(false); // Close the modal even if an error occurs
    }
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // Close the modal without doing anything
  };

  return (
    <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center dark:bg-boxdark-2 dark:text-bodydark">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-bold dark:bg-boxdark-2 dark:text-bodydark">
            Kaarmi<span className="text-red-500">Q</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 rtl:space-x-reverse items-center">
          {["Home", "Booking","Table", "About", "Contact"].map((item) => {
            let icon;
            let linkPath = "/"; // Define a separate scoped variable for each item
            switch (item) {
              case "Home":
                linkPath = "/";
                // icon = "";
                break;
              case "About":
                linkPath = "/aboutus";
                // icon = "";
                break;
              case "Table":
                // icon = "";
                linkPath = "/user/tables";
                break;
              case "Booking":
                linkPath = "/user/bookings";
                // icon = "";
                break;
              case "Contact":
                linkPath = "/contact";
                // icon = "";
                break;
              default:
                icon = null;
            }

            return (
              <Link
                key={item}
                href={linkPath} // Use the scoped variable
                className="relative text-gray-700 dark:text-gray-300 group flex items-center space-x-2 text-lg"
              >
                <span className="z-10 flex items-center space-x-4 pb-1">
                  {icon}
                  <span>{item}</span>
                </span>

                {/* Underline Effect */}
                <span className="absolute bottom-0 -left-2 block w-0 h-1 bg-red-500 transition-all duration-500 group-hover:w-full dark:bg-blue-400"></span>
              </Link>
            );
          })}
        </div>

        {/* User Menu Button on Desktop */}
        <div className="relative hidden md:flex items-center group">
          <button
            type="button"
            className="flex items-center bg-gray-800 p-2 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
          >
            {user?.img ? (
                <Image className="w-8 h-8 rounded-full" src={user.img} alt="user photo" />
            ) : (
              <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full">
                <svg
                    className="w-7 h-7 text-gray-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                    />
                </svg>
              </div>
            )}
          </button>

          <div className="absolute right-0 mt-64 z-50 hidden bg-white dark:bg-gray-700 rounded-lg shadow-md w-48 group-hover:block transition-all duration-200 ease-in-out">
            <div className="p-4 border-b dark:border-gray-600">
              {user ? (
                <>
                  <span className="block text-lg text-gray-900 dark:text-white">{user.username}</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</span>
                </>
              ) : (
                <span className="block text-sm text-gray-500 dark:text-gray-400">Loading...</span>
              )}
            </div>
            <ul className="py-2 text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/user/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/user/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={handleLogoutClick} // Open modal on logout
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for logout confirmation */}
      {isModalOpen && (
        <div className="fixed bg-black inset-0 z-50 flex items-center justify-center bg-opacity-50 mt-80">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Are you sure you want to logout?</h2>
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={handleCancelLogout} className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleConfirmLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
