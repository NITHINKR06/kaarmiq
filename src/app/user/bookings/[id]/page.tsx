"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify"; // Assuming you are using toast notifications
import Loader from "@/components/common/Loader";
import NavBar from "@/components/NavBar/Navbar";
import Calendar from "@/components/Calender";
import { format } from "date-fns";
import Ratings from '@/components/Review/Ratings'
import RatingEmployee from '@/components/Review/RatingEmployee'

type Employee = {
  _id: string;
  username: string;
  email: string;
  employeeImage: string;
};

type EmployeeDetails = {
  fullname: string;
  jobRole: string;
  level: string;
  experience: number;
  place: string;
  aboutme: string;
};

type User ={
  _id: String;
  username: String;
  email: string;

}

const EmployeeDetail = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
  const params = React.use(paramsPromise);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookedDate, setBookedDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState<string>('');
  const [showRatings, setShowRatings] = useState<boolean>(true);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowRatings(e.target.checked);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setStartTime(time);

    if (!time || !time.includes(":")) return;

    const [hoursString, minutesString] = time.split(":");
    const hours = Number(hoursString);
    const minutes = Number(minutesString);

    if (isNaN(hours) || isNaN(minutes)) return;

    if (time >= "09:00" && time <= "21:00") {
      const date = new Date();
      date.setHours(hours, minutes);

      const formattedTime = format(date, "hh:mm a");
      setBookingTime(formattedTime);
    } else {
      toast.warning("Please select a time between 9:00 AM and 9:00 PM.", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data.data);
      } catch (error: any) {
        toast.error('User not found');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { id } = await params;
        setLoading(true);
        const response = await axios.get(`/api/employee/${id}`);
        setEmployee(response.data);
      } catch (error) {
        toast.error("Error fetching employee data", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [params]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!employee?._id) return;
      try {
        const response = await axios.get(`/api/employee/empdetails`, {
          params: { employeeId: employee._id },
        });
        setEmployeeDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [employee]);

  const handleBooking = async () => {
    if (!selectedDate || !bookingTime) {
      alert("Please select a date and time.");
      return;
    }
  
    const bookingDetails = {
      empId: employee?._id,
      userId: user?._id,
      userName: user?.username,
      employeeUsername: employee?.username,
      jobRole: employeeDetails?.jobRole,
      empEmail: employee?.email,
      userEmail: user?.email,
      query: query, // add query here
      selectedDate,
      bookingTime,
    };
  
    try {
      const response = await axios.post("/api/auth/bookings", bookingDetails);
      if (response.status === 201) {
        toast.success("Booking successfully created!", { position: "top-center" });
        setBookedDate(selectedDate);
        setSelectedDate(null);
        setStartTime(null);
        setQuery(''); // Reset query after successful booking
      }
    } catch (error) {
      toast.error("Failed to place booking.", { position: "top-center" });
    }
  };  

  if (loading) {
    return <Loader />;
  }

  if (!employee) {
    return <p className="text-center text-gray-600">Employee not found</p>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer />
      <NavBar />
      <div className="container mx-auto pt-25 px-6 pb-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 hover:shadow-xl transition-all duration-300 w-full md:w-1/3">
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300">
              {employee.employeeImage ? (
                <Image
                  src={employee.employeeImage}
                  alt={employee.username}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-full">
                  <svg
                    className="w-20 h-20 text-gray-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
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
            <h1 className="text-2xl font-semibold text-gray-800">
              {employee.username || "No Name"}
            </h1>
            <p className="text-sm text-gray-500">{employee.email || "No Email"}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 w-full md:w-2/3 transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {employeeDetails?.fullname || "No Name"}
              </h2>
              <p className="text-lg text-gray-600">{employeeDetails?.jobRole || "No Role"}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <p className="text-gray-700">
                <strong className="text-gray-900">Level:</strong>{" "}
                {employeeDetails?.level || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Experience:</strong>{" "}
                {employeeDetails?.experience || "0"} years
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Location:</strong>{" "}
                {employeeDetails?.place || "N/A"}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-6 shadow-inner">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h3>
              <p className="text-gray-600 text-sm">
                {employeeDetails?.aboutme || "No information provided."}
              </p>
            </div>
          </div>
        </div>

        {/* this feild for employee review */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 w-full">
          <div className="flex flex-col lg:flex-row justify-around gap-6 mt-4">
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-md font-semibold text-gray-800">
                  {showRatings ?  "Write a Review" : "View Reviews"}
                </span>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={showRatings}
                    onChange={handleCheckboxChange}
                    className="sr-only peer"
                  />
                  <span
                    className="absolute inset-0 bg-gray-300 rounded-full 
                      peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-300
                      transition duration-300 ease-in-out"
                  ></span>
                  <span
                    className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-md transform
                      transition-transform duration-300 ease-in-out peer-checked:translate-x-6"
                  ></span>
                </label>
              </div>
              <div className=" w-full">
                {showRatings ? <RatingEmployee employeeId={employee?._id} /> : <Ratings employeeId={employee?._id} />}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shado w-lg p-8 mt-8 w-full">
          <div className="flex flex-col lg:flex-row justify-around  mt-4">
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Select a Date to Book</h3>
              
              <Calendar onDateChange={setSelectedDate} bookedDate={bookedDate} />
            
              <div className="p-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {/* <!-- Unavailable --> */}
                <div className="flex flex-col items-center w-18">
                  <div className="w-8 h-8 rounded-full bg-red-300 border-2 border-red-600 shadow-md"></div>
                  <h1 className="text-gray-800 font-semibold text-xs text-center mt-2">Unavailable</h1>
                </div>

                {/* <!-- Maybe Available --> */}
                <div className="flex flex-col items-center w-24">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 border-2 border-yellow-500 shadow-md"></div>
                  <h1 className="text-gray-800 font-semibold text-xs text-center mt-2">Maybe Available</h1>
                </div>

                {/* <!-- Available --> */}
                <div className="flex flex-col items-center w-18">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 shadow-md"></div>
                  <h1 className="text-gray-800 font-semibold text-xs text-center mt-2">Available</h1>
                </div>
              </div>

            </div>

            <div className=" lg:w-1/2 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Select the Booking Time</h3>
              <div className="bg-white shadow-lg p-6 rounded-xl ">
                <div className="relative">
                  <label htmlFor="start-time" className="block text-gray-800 text-md font-bold mb-2">
                    Select Time
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                    value={startTime || ""}
                    onChange={handleTimeChange}
                  />
                </div>
                <div className="text-sm text-gray-500 mt-3">
                  <p className=" text-gray-700 text-md font-bold">Available times: 9 AM to 9 PM</p>
                  <p>Note: Select a time within the working hours.</p>
                </div>
              </div> <br />
              <div className="bg-white shadow-lg p-6 rounded-xl w-100">
                <div className="relative">
                  <label htmlFor="start-time" className="block text-gray-800 text-md font-bold mb-2">
                    Enter your Location 
                  </label>
                  <input
                    id="query"
                    placeholder="Enter your complete location!"
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // handle query change
                    required
                  />
                </div>
              </div>
              
            </div>
          </div>

          <p className="text-base text-gray-600 mt-4 text-center">
            Selected Date: <span className="font-semibold">{selectedDate || "None"}</span>
          </p>

          <button
            onClick={handleBooking}
            className={`mt-4 w-full py-3 text-white rounded-lg text-xl font-semibold bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 ${
              !selectedDate || !startTime ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
