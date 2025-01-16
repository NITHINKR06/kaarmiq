'use client';

import React from 'react';
import { useProgress } from '../Contexts/ProgressContext';

const ProgressPage: React.FC = () => {
  const { level, xp, xpRequired } = useProgress();

  return (
    <div className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Employee Progress</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Level: <span className="font-semibold text-gray-800 dark:text-gray-200">{level}</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        XP: <span className="font-semibold text-gray-800 dark:text-gray-200">{xp} / {xpRequired}</span>
      </p>
      <div className="relative h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mt-4">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
          style={{ width: `${(xp / xpRequired) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressPage;
