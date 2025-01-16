'use client';

import Loader from '@/components/common/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/Navbar';

type Booking = {
  _id: string;
  bookingTime: string;
  createdAt: string;
  empEmail: string;
  empId: string;
  employeeUsername: string;
  jobRole: string;
  query: string;
  selectedDate: string;
  status: string;
  updatedAt: string;
  userEmail: string;
  userId: string;
  userName: string;
};

const PaymentPage = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
  const params = React.use(paramsPromise);
  const [loading, setLoading] = useState<boolean>(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { id } = await params;
        setLoading(true);
        const response = await axios.get(`/api/auth/booking/${id}`);
        setBooking(response.data.booking);
        console.log(response);
      } catch (error) {
        toast.error('Error fetching booking data', { position: 'top-center' });
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <NavBar />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Payment Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Booking Information</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Booking ID:</span> {booking?._id}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Booking Time:</span> {booking?.bookingTime}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Selected Date:</span> {booking?.selectedDate}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded ${
                booking?.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking?.status}
              </span>
            </p>
          </div>

          {/* User & Employee Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Contact Details</h2>
            <p className="text-gray-600">
              <span className="font-semibold">User Name:</span> {booking?.userName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">User Email:</span> {booking?.userEmail}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Employee Name:</span> {booking?.employeeUsername}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Employee Email:</span> {booking?.empEmail}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Job Role:</span> {booking?.jobRole}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Payment</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to proceed with the payment for this booking?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Checkout</h2>
            {/* Display the checkout page */}
            <iframe
              src="/auth/payments" // Replace with the actual checkout page URL
              className="w-full h-125 rounded-lg border border-gray-300"
              title="Checkout"
            ></iframe>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
