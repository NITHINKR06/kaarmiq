'use client'

import React, { useEffect, useState } from 'react'
import Aboutus from '@/components/Aboutus/Aboutus'
import NavBar from '@/components/NavBar/Navbar'
import Link from 'next/link';
import NavBarEmp from '@/components/NavBar/NavBarEmp';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  role?: string,
}

interface Emp {
  role?: string,
}

export default function AboutUsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Emp | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data.data); // Assuming response.data.data contains user info
        toast.success("User Found")
      } catch (error: any) {
        console.log('Error fetching user data:', { error: error.message });
        toast.error('User not found');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/employee/empdata');
        setEmployee(response.data.data); // Assuming response.data.data contains user info
        toast.success("Employee Found")

      } catch (error: any) {
        console.log('Error fetching user data:', { error: error.message });
        toast.error('User not found');
      }
    };

    fetchUserData();
  }, []);

  if (user?.role === 'user') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-boxdark-2 dark:text-bodydark">
        <NavBar/>
        <Aboutus/>
      </div>
    );
  } else if (employee?.role === 'employee') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-boxdark-2 dark:text-bodydark">
        <NavBarEmp/>
        <Aboutus/>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r ">
        <div className="bg-white dark:bg-boxdark-1 p-10 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all duration-300 ">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Your Session Expired
          </h1>
          <p className="text-lg text-gray-600 dark:text-bodydark mb-8">
            Looks like you&apos;ve been logged out or your session expired. Please log in again to continue.
          </p>
          <Link href="/auth/signin">
            <p className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300">
              Log In Again
            </p>
          </Link>
          <p className="mt-6 text-sm text-gray-500 dark:text-bodydark">
            Need assistance? <Link href="/reachus" className="text-blue-600 hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    );
  }  
}

