'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import EmployeeSearch from '@/components/Empprofile/EmployeeSearch';
import Image from 'next/image';

export default function ProfileList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchJobRole, setSearchJobRole] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [searchExperience, setSearchExperience] = useState('');

  // Fetch employees data when the component mounts
  useEffect(() => {
    async function fetchEmployees() {
      try {
        // console.log('Fetching employee data...');

        const response = await fetch('/api/employee/getallemployee');
        const data = await response.json();
        const response2 = await axios.get('/api/employee/getallemployee/empdetails');
        const data2 = response2.data.data;

        if (data.success) {
          const employeesMap = {};

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

  return (
    <div>
      {/* Pass search props to EmployeeSearch */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredEmployees.length === 0 ? (
          <p className="col-span-full text-center text-gray-800 dark:text-gray-100 font-bold text-xl py-5 px-8 bg-gradient-to-r rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105">
            No employees found rty to refresh the page.

          </p>
        
        ) : (
          filteredEmployees.map((employee) => (
            <Link key={employee._id} href={`/user/bookings/${employee._id}`}>
              <div
                className="flex flex-col items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                style={{ width: '300px' }}
              >
                <div className="flex flex-col items-center">
                  {/* Employee Image */}
                  <div className="w-28 h-28 mb-4 rounded-full shadow-lg">
                    {employee.employeeImage ? (
                      <Image
                        className="w-28 h-28 rounded-full"
                        alt={employee.fullname || 'Employee Image'}
                      />
                    ) : (
                      <div className="relative w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {employee.fullname || 'No Name'}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {employee.jobRole || 'No Job mentioned'}
                  </span>
                  <div className="flex mt-3">
                    {employee.place || 'Not mentioned'}
                  </div>
                </div>
                {/* Additional Details */}
                <div className="mt-4 text-center space-y-2 w-75">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    <strong>Experience:</strong>{' '}
                    <span className="text-gray-900 dark:text-white">
                      {employee.experience || 'Updating..'}
                    </span>
                  </p>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 justify-center">
                  <Link
                    href={`/user/bookings/${employee._id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all duration-300"
                  >
                    Check Booking
                  </Link>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
