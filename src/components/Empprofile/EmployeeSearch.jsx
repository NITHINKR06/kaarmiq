'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function EmployeeSearch({ onSearch }) {
  const [searchJobRole, setSearchJobRole] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [searchExperience, setSearchExperience] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCriteria = {
      jobRole: searchJobRole.trim(),
      place: searchPlace.trim(),
      experience: searchExperience.trim(),
    };
    if (onSearch) {
      onSearch(searchCriteria);
    }
  };

  const handleClear = () => {
    setSearchJobRole('');
    setSearchPlace('');
    setSearchExperience('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-5xl mx-auto px-4 bg-white dark:bg-gray-800 py-3 rounded-full flex flex-wrap md:flex-nowrap items-center gap-4 mt-5 mb-8 shadow-md"
    >
      {/* Search Icon */}
      <div className="text-black-2 flex items-center justify-center w-auto">
        <FiSearch size={20} />
      </div>

      {/* Job Role Input */}
      <input
        type="text"
        placeholder="Skills / Designations / Companies"
        value={searchJobRole}
        onChange={(e) => setSearchJobRole(e.target.value)}
        className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500"
        aria-label="Job Role"
        required
      />

      {/* Divider */}
      <div className="h-6 w-[1px] bg-gray-400 dark:bg-gray-600 hidden md:block" />

      {/* Experience Dropdown */}
      <select
        value={searchExperience}
        onChange={(e) => setSearchExperience(e.target.value)}
        className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500"
        aria-label="Experience"
      >
        <option value="">Experience</option>
        {[...Array(31)].map((_, i) => (
          <option key={i} value={i}>
            {i} Year{`${i !== 1 ? 's' : ''}`}
          </option>
        ))}
      </select>

      {/* Divider */}
      <div className="h-6 w-[1px] bg-gray-400 dark:bg-gray-600 hidden md:block" />

      {/* Location Input */}
      <input
        type="text"
        placeholder="Location"
        value={searchPlace}
        onChange={(e) => setSearchPlace(e.target.value)}
        className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500"
        aria-label="Location"
        required
      />

      {/* Buttons Container */}
      <div className="flex items-center justify-center gap-2">
        {/* Search Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none transition"
        >
          <Link href="/user/bookings">Search</Link>
        </button>

        {/* Clear Button */}
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none transition"
          aria-label="Clear Search"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
