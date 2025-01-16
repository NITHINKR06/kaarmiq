'use client';

import React, { useState } from 'react';
import { useProgress } from '@/components/Contexts/ProgressContext';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import NavBarEmpProfile from '@/components/NavBar/NavBarEmpProfile';

const TasksPage: React.FC = () => {
  const { completeTask } = useProgress();

  // Example tasks related to electronics
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Identify electronic components', completed: false },
    { id: 2, title: 'Measure voltage using a multimeter', completed: false },
    { id: 3, title: 'Solder a simple circuit', completed: false },
    { id: 4, title: 'Assemble a breadboard circuit', completed: false },
    { id: 5, title: 'Test an LED with a resistor', completed: false },
  ]);

  // Handle task completion
  const handleTaskComplete = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    completeTask();
  };

  // all task listed here
  // xp and level are in components/level 
  // progress and all calculation are done in components/contexts

  return (
    <>
      <NavBarEmpProfile/>
     <div className='pt-25'>
     <div className="max-w-lg h-full mx-auto p-6 bg-gradient-to-tr from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 dark:text-gray-100">
        🚀  Tasks
      </h2>
      <ul className="space-y-5">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-lg transition-all duration-300 ${
              task.completed
                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                : 'bg-white hover:shadow-xl hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
            }`}
          >
            <span
              className={`text-lg font-medium ${
                task.completed ? 'line-through' : ''
              }`}
            >
              {task.title}
            </span>
            <button
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-lg transform transition-transform ${
                task.completed
                  ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-md'
              }`}
              onClick={() => !task.completed && handleTaskComplete(task.id)}
              disabled={task.completed}
            >
              {task.completed ? 'Done' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
     </div>
    </>
  );
};

export default TasksPage