import Image from 'next/image';
import React from 'react';

export default function AboutUs() {
  return (
    <div className="">
      <section className=" pt-45 py-20 bg-gradient-to-br from-indigo-50 to-white w-full h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images Section */}
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <Image
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                  src="https://pagedone.io/asset/uploads/1717741205.png"
                  alt="Team Collaboration"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <Image
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                  src="https://pagedone.io/asset/uploads/1717741215.png"
                  alt="Success Story"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-10">
              <div className="text-center lg:text-left">
                <h2 className="text-gray-800 text-4xl md:text-5xl font-extrabold leading-snug">
                  Empowering Each Other <br className="hidden md:block" /> to Succeed
                </h2>
                <p className="text-gray-600 mt-4 text-lg md:text-xl leading-relaxed">
                  Every project we&apos;ve undertaken has been a collaborative effort, where every person involved has
                  left their mark. Together, we&apos;ve not only constructed buildings but also built enduring connections
                  that define our success story.
                </p>
              </div>

              {/* Statistics Section */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-indigo-600 text-5xl font-bold">5+</h3>
                  <p className="text-gray-500 mt-2 text-base">Years of Experience</p>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-indigo-600 text-5xl font-bold">50+</h3>
                  <p className="text-gray-500 mt-2 text-base">Successful Projects</p>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-indigo-600 text-5xl font-bold">100+</h3>
                  <p className="text-gray-500 mt-2 text-base">Happy Clients</p>
                </div>
              </div>

              {/* Call-to-Action Button */}
              <div className="flex justify-center lg:justify-start">
                <button
                  className="px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
