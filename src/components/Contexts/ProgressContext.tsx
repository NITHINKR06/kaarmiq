'use client';

import React, { createContext, useContext, useState } from 'react';

interface ProgressContextType {
  level: number;
  xp: number;
  xpRequired: number;
  completeTask: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState<number>(1);
  const [xp, setXP] = useState<number>(0);
  const [xpRequired, setXPRequired] = useState<number>(100);
  const xpPerTask = 10;

  const completeTask = () => {
    const newXP = xp + xpPerTask;

    if (newXP >= xpRequired) {
      setLevel((prev) => prev + 1); // Increase the level
      setXP(newXP - xpRequired); // Carry over excess XP
      setXPRequired((prev) => prev + 50); // Increment XP requirement
    } else {
      setXP(newXP); // Just add XP
    }
  };

  return (
    <ProgressContext.Provider value={{ level, xp, xpRequired, completeTask }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
