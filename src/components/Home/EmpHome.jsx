'use client';

import EmployeeSearch from '../Empprofile/EmployeeSearch';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Jobs from "../../../public/images/cards/Jobs.png"
import MarqueeDemo from '../Animations/Marquee';
import PricingPlan from '@/components/PricingPlan/Pricing'
import VissionMission from '@/components/Aboutus/VM'
import Link from 'next/link';
import NavBarEmp from '../NavBar/NavBarEmp'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Notify from '@/components/Notification/Notify'

export default function EmpHome() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);
    const closeModal = () => setDropdownOpen(false);

    const handleBackdropClick = (event) => {
      // Close modal if the click is on the backdrop (not the modal content)
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchJobRole, setSearchJobRole] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [searchExperience, setSearchExperience] = useState('');

  // Fetch employees data when the component mounts
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch('/api/employee/getallemployee');
        const data = await response.json();

        const response2 = await axios.get('/api/employee/getallemployee/empdetails');
        const data2 = response2.data.data;

        if (data.success) {
          const employeesMap = {};

          // Combine employee data from two APIs
          data.data.forEach((employee) => {
            employeesMap[employee._id] = { ...employee };
          });

          data2.forEach((employee) => {
            if (employeesMap[employee._id]) {
              employeesMap[employee._id] = { ...employeesMap[employee._id], ...employee };
            } else {
              employeesMap[employee._id] = { ...employee };
            }
          });

          const combinedEmployees = Object.values(employeesMap);
          setEmployees(combinedEmployees);
          setFilteredEmployees(combinedEmployees);
        } else {
          console.error('Error fetching employees:', data.message);
        }
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    }

    fetchEmployees();
  }, []);

  // Filter employees based on search criteria
  useEffect(() => {
    const filtered = employees.filter((employee) => {
      return (
        (employee.jobRole?.toLowerCase().includes(searchJobRole.toLowerCase()) || !searchJobRole) &&
        (employee.place?.toLowerCase().includes(searchPlace.toLowerCase()) || !searchPlace) &&
        (employee.experience?.toString().includes(searchExperience) || !searchExperience)
      );
    });
    setFilteredEmployees(filtered);
  }, [searchJobRole, searchPlace, searchExperience, employees]);

  const roles = [
    { title: 'Plumbing', jobs: '....' },
    { title: 'Electrician', jobs: '....' },
    { title: 'Cleaning Services', jobs: '....' },
    { title: 'Gardening', jobs: '2.4K+ Jobs' },
    { title: 'Appliance Repair', jobs: '....' },
    { title: 'Others', jobs: '....' },
  ];

  return (
    <div >
      <ToastContainer/>
      
        <div className="w-full flex flex-col items-center">
          {/* Header Section */}
          <div className="w-full h-screen flex flex-col justify-center items-center">

            {/* Header Section */}
            <div className="text-center dark:bg-boxdark-2 dark:text-bodydark">
              <h1 className="text-4xl font-bold text-black dark:bg-boxdark-2 dark:text-bodydark">
                Kaarmi<span className="text-red-500">Q</span>
              </h1>
              <p className="text-lg text-gray-700 mt-2 dark:bg-boxdark-2 dark:text-bodydark">
                Welcome to our platform! Stay tuned for more updates.
              </p>
            </div>

            {/* Search Section */}
            <div className="w-10/12 md:w-2/4 mt-5">
              <EmployeeSearch
                onSearch={({ jobRole, place, experience }) => {
                  const filtered = employees.filter((employee) => {
                    return (
                      (employee.jobRole?.toLowerCase().includes(jobRole.toLowerCase()) || !jobRole) &&
                      (employee.place?.toLowerCase().includes(place.toLowerCase()) || !place) &&
                      (employee.experience?.toString().includes(experience) || !experience)
                    );
                  });
                  setFilteredEmployees(filtered);
                }}
              />
            </div>

            <div className="text-center dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                    <div className="text-center lg:text-left">
                      <h3 className="text-indigo-600 text-5xl font-bold">1+</h3>
                      <p className="text-gray-500 mt-2 text-base">Years of Experience</p>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-indigo-600 text-5xl font-bold">10+</h3>
                      <p className="text-gray-500 mt-2 text-base">Successful Projects</p>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-indigo-600 text-5xl font-bold">Many</h3>
                      <p className="text-gray-500 mt-2 text-base">Happy Clients</p>
                    </div>
                  </div>
            </div>

          </div>

          <div className="w-11/12">
            <VissionMission />
          </div>

          {/* Popular Roles Section */}
          <div className="flex justify-center items-center my-10 pt-10 pb-10 relative">
            <div className="flex bg-gradient-to-r border from-white to-orange-100 rounded-xl border-orange-400 p-8 shadow-lg relative w-230 h-90">
              {/* Illustration Section */}
              <div className="flex flex-col mr-8 items-center justify-center w-100">
                <Image
                  src={Jobs}
                  alt="Illustration"
                  className="w-40 h-40 mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-2 w-100">
                  Discover jobs across popular roles
                </h1>
                <p className="text-gray-600 text-base w-100">
                  Select a role and we&apos;ll show you relevant jobs for it!
                </p>
              </div>

              {/* Job Cards Section */}
              <div className="relative w-full">
                <div className="grid grid-cols-2 p-6 gap-2 w-100 h-100 border border-gray-200 bg-white rounded-3xl inset-0 absolute -top-14 left-0 right-0 z-10">
                  {roles.map((role, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-300 h-15 w-42 p-2 shadow hover:shadow-md transition cursor-pointer hover:scale-105"
                    >
                      <h3 className="text-sm font-bold text-gray-800">{role.title}</h3>
                      <p className="text-gray-500 text-xs">{role.jobs}</p>
                    </div>
                  ))}
                  <button className="ml-25 items-center w-35 -mt-2 bg-blue-500 rounded-md text-white">
                    <Link href={'/user/bookings'}> Explore</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee Section */}
          <div className="w-11/12 my-5">
            <MarqueeDemo />
          </div>
          <div className="w-11/12 my-5">
            <PricingPlan />
          </div>
      
        </div>

      <Notify/> {/* Notification */}
    </div>
  )
}
