import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footers() {
  return (
    <footer className="bg-gray-100 text-black-2 pt-10 shadow-0">
      <div className="container mx-auto p-10 sm:px-10 lg:px-20">
        {/* Main Footer Row */}
        <div className="flex flex-wrap items-start justify-between">
          {/* Logo and Social Media Section */}
          <div className="flex flex-col items-start md:w-1/3 pr-32">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-4xl font-bold text-black-2 dark:bg-boxdark-2 dark:text-bodydark">
                Kaarmi<span className="text-red-500">Q</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm mb-4 w-150">
              Connecting talent with opportunities globally.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-900 transition"
                aria-label="Facebook"
              >
                <FaFacebook />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-900 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-900 transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-900 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className=" md:w-1/3 flex justify-end">
            <div className="grid grid-cols-2 gap-10">
              {/* About Links */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">About</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Employer home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Sitemap
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Credits
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Terms & conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Fraud alert
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition">
                      Trust & safety
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 text-xs mt-10">
          &copy; {new Date().getFullYear()} KaarmiQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
