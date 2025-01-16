'use client'
import Image from 'next/image'
import React from 'react'
import mission from '../../../public/images/cards/mission.png'  // Update with the correct image path
import vission from '../../../public/images/cards/vission.png'  // Update with the correct image path

export default function VissionMission() {
  return (
    <div className="text-center p-8 max-w-7xl mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Why Choose Us?
        </h2>

        <div className="flex flex-wrap items-center justify-center mt-16 text-left">
            <div className="w-1/2 md:w-1/3 px-4 flex justify-center"> {/* Reduced container size */}
                <Image 
                    src={vission} 
                    alt="Kaarmiq Vision" 
                    className="inline-block rounded shadow-lg" 
                    width={300} // Keeping image size the same
                    height={300} // Keeping image size the same
                />
            </div>
            <div className="w-1/3 md:w-1/2 px-4 text-center md:text-left">
                <h3 className="font-bold text-xl sm:text-2xl">
                    Vision of Kaarmiq
                </h3>
                <ul className="sm:text-lg mt-6 list-inside list-disc">
                    <li>To Be The Top Platform for reliable, on-demand home services.</li>
                    <li>Empowering customers with easy access to skilled professionals.</li>
                    <li>Building trust and quality in every service we provide.</li>
                    <li>Transforming home service experiences with convenience and reliability.</li>
                </ul>
            </div>
        </div>

        <div className="flex flex-wrap items-center justify-center mt-16 text-left">
            <div className="w-1/3 md:w-1/2 px-4 text-center md:text-left">
                <h3 className="font-bold text-xl sm:text-2xl">
                    Mission of Kaarmiq
                </h3>
                <ul className="sm:text-lg mt-6 list-inside list-disc">
                    <li>Offering diverse, high-quality home services with expert professionals.</li>
                    <li>Ensuring transparency, trust, and affordability for customers.</li>
                    <li>Providing a seamless, user-friendly booking experience.</li>
                    <li>Empowering professionals with tools and opportunities for growth.</li>
                    <li>Continuously improving based on feedback and industry trends.</li>
                </ul>
            </div>
            <div className="w-2/3 md:w-1/4 px-4 flex justify-center"> {/* Reduced container size */}
                <Image 
                    src={mission} 
                    alt="Kaarmiq Mission" 
                    className="inline-block rounded shadow-lg" 
                    width={300} // Keeping image size the same
                    height={300} // Keeping image size the same
                />
            </div>
        </div>
    </div>
  );
}
