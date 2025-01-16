'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { toast, ToastContainer } from 'react-toastify';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import NavBar from '@/components/NavBar/Navbar';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data.data);
        toast.success('User details found!');
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('User not found');
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar />

      <div className="bg-gray-100 min-h-screen mt-15">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="relative">
              {/* Cover Image */}
              <Image
                src="/images/cover/cover-01.png"
                alt="Profile Cover"
                className="w-full h-64 object-cover object-center rounded-t-xl"
                width={970}
                height={260}
              />
              {/* Edit Button */}
              <div className="absolute bottom-6 right-6 z-20">
                <label
                  className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-opacity-90"
                >
                  <MdOutlinePhotoCamera />
                  <span>Edit Cover</span>
                </label>
              </div>
            </div>
            {/* Profile Picture */}
            <div className="text-center pb-12">
              
              <div className="inline-block w-40 relative z-30 mx-auto -mt-22 h-30 sm:w-52 sm:h-52 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                <Image
                  src="/images/user/user-06.png"
                  alt="User Profile"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
                {/* Profile Picture Edit Button */}
              </div>
                <label
                  className=" w-40 relative z-30 mx-auto -mt-10 h-30 sm:w-12 sm:h-12 border-4 border-white shadow-xl overflow-hidden bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer"
                >
                  <MdOutlinePhotoCamera />
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>

              {/* User Information */}
              <div className="mt-6">
                <h3 className="text-3xl font-semibold text-gray-900">
                  {user ? (
                    <>
                      <span className="block text-xl text-gray-800">{user?.fullname}</span>
                      <span className="block text-sm text-gray-600 truncate">{user?.email}</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-600">Loading...</span>
                  )}
                </h3>
                {/* <p className="text-lg text-gray-700 mt-2">{user?.}</p> */}
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-900">About Me</h4>
            <p className="mt-4 text-gray-700">
              {user?.aboutme || 'This user has not added an about me section yet.'}
            </p>
          </div>

          {/* Contact Information Section */}
          <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              <div>
                <h5 className="text-sm text-gray-600">Phone</h5>
                <p className="text-gray-800">{user?.phoneNumber || 'Not Provided'}</p>
              </div>
              <div>
                <h5 className="text-sm text-gray-600">Address</h5>
                <p className="text-gray-800">{user?.address || 'Not Provided'}</p>
              </div>
              <div>
                <h5 className="text-sm text-gray-600">Location</h5>
                <p className="text-gray-800">{user?.location || 'Not Provided'}</p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          {/* <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Notifications</h4>
            <ul className="mt-4 text-gray-700">
              {user?.notifications?.length ? (
                user.notifications.map((notification, index) => (
                  <li key={index} className="mb-2">
                    {notification}
                  </li>
                ))
              ) : (
                <li>No notifications available.</li>
              )}
            </ul>
          </div> */}

          {/* Additional Information Section */}
          <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Additional Information</h4>
            <p className="mt-4 text-gray-700">{user?.experience || 'No additional information available.'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
