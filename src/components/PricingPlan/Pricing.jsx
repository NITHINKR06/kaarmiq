'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const PricingPlan = () => {
    const [isMonthly, setIsMonthly] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleBillingToggle = (plan) => {
      setIsMonthly(plan === 'monthly');
    };
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div className="sm:flex sm:flex-col sm:align-center pt-10">
      <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
        <button
          type="button"
          className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${isMonthly ? 'bg-slate-50 text-slate-900' : 'bg-transparent text-slate-500'}`}
          onClick={() => handleBillingToggle('monthly')}
        >
          Monthly billing
        </button>
        <button
          type="button"
          className={`ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${!isMonthly ? 'bg-slate-50 text-slate-900' : 'bg-transparent text-slate-500'}`}
          onClick={() => handleBillingToggle('yearly')}
        >
          Yearly billing
        </button>
      </div>
      <div className=" space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        
        {/* Starter Plan */}
        <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold text-slate-900">Starter</h2>
            <p className="mt-2 text-base text-slate-700 leading-tight">For new makers and employees who want to fine-tune and test ideas.</p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-slate-900 tracking-tighter">{isMonthly ? '$0' : '$0'}</span>
              <span className="text-base font-medium text-slate-500">/ {isMonthly ? 'mo' : 'yr'}</span>
            </p>
            <button
              onClick={openModal}
              className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Join as a Starter
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">What&apos;s included</h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">1 landing page included</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Access to basic job features</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Basic employee management</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Employee sign-up system</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Superior Plan */}
        <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold text-slate-900">Superior</h2>
            <p className="mt-2 text-base text-slate-700 leading-tight">For employers who want to manage teams and streamline operations.</p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-slate-900 tracking-tighter">{isMonthly ? '$8' : '$80'}</span>
              <span className="text-base font-medium text-slate-500">/ {isMonthly ? 'mo' : 'yr'}</span>
            </p>
            <button
              onClick={openModal}
              className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Join as a Superior
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">What&apos;s included</h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">5 landing pages included</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Advanced employee management</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Job postings & applicant tracking</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Team performance metrics</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Shipper Plan */}
        <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold text-slate-900">Shipper</h2>
            <p className="mt-2 text-base text-slate-700 leading-tight">For large teams and enterprises looking to scale operations and manage employees efficiently.</p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-slate-900 tracking-tighter">{isMonthly ? '$15' : '$150'}</span>
              <span className="text-base font-medium text-slate-500">/ {isMonthly ? 'mo' : 'yr'}</span>
            </p>
            <button
              onClick={openModal}
              className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Join as a Shipper
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">What&apos;s included</h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Unlimited landing pages</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Advanced employee performance metrics</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Advanced reporting & analytics</span>
              </li>
              <li className="flex space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Enterprise-level security</span>
              </li>
            </ul>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Pricing is in development</h2>
            <p className="mt-4 text-base text-slate-700">
              Once done, we will get you to know.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default PricingPlan;
