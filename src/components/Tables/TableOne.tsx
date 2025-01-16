"use client";

import Link from "next/link";
import { useState } from "react";

interface Booking {
  _id: string;
  employeeUsername: string;
  empEmail: string;
  selectedDate: string;
  bookingTime: string;
  status: "cancelled" | "confirmed";
}

interface TableOneProps {
  bookings: Booking[];
  isLoading: boolean;
  error: string;
  statusBooking: (
    bookingId: string,
    newStatus: "cancelled" | "confirmed",
    reasonOfCancel?: string
  ) => void;
}

const TableOne = ({ bookings, isLoading, error, statusBooking }: TableOneProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [reasonOfCancel, setReasonOfCancel] = useState("");

  const openModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
    setReasonOfCancel("");
  };

  const handleCancel = () => {
    if (selectedBookingId) {
      statusBooking(selectedBookingId, "cancelled", reasonOfCancel);
      closeModal();
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h4 className="mb-8 text-3xl font-semibold text-gray-900 dark:text-white text-center">
        Employee Bookings
      </h4>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-800/80"
            >
              <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-center">
                {booking.employeeUsername}
              </h5>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p>Email: {booking.empEmail}</p>
                <p>Date: {booking.selectedDate}</p>
                <p>Time: {booking.bookingTime}</p>
              </div>

              <div className="flex justify-center mt-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    booking.status === "cancelled"
                      ? "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-100"
                      : "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-6 flex flex-col items-center gap-4">
                {booking.status !== "cancelled" && (
                  <button
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-red-600 hover:scale-105"
                    onClick={() => openModal(booking._id)}
                    aria-label="Cancel booking"
                  >
                    Cancel
                  </button>
                )}
                {booking.status !== "cancelled" ? (
                  <Link href={`/user/tables/${booking._id}`}>
                    <button
                      className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-600 hover:scale-105"
                      aria-label="Go to Payments"
                    >
                      Payments
                    </button>
                  </Link>
                ) : (
                  <button
                    className="rounded-xl bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 cursor-not-allowed"
                    disabled
                    aria-label="Payments disabled"
                  >
                    Payments Disabled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No bookings available.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl backdrop-blur-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white text-center">
              Cancel Booking
            </h2>
            <textarea
              className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter reason for cancellation..."
              value={reasonOfCancel}
              onChange={(e) => setReasonOfCancel(e.target.value)}
              aria-label="Reason for cancellation"
            />
            <div className="flex justify-center gap-4">
              <button
                className="rounded-xl bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300"
                onClick={closeModal}
                aria-label="Close modal"
              >
                Close
              </button>
              <button
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 hover:scale-105"
                onClick={handleCancel}
                aria-label="Submit cancellation"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOne;
