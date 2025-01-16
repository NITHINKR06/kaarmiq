import { useState } from "react";

interface TableOneProps {
  bookings: any[];
  isLoading: boolean;
  error: string;
  statusBooking: (
    bookingId: string,
    newStatus: "cancelled" | "confirmed",
    reasonOfCancel?: string
  ) => void;
}


const TableTwo = ({ bookings, isLoading, error, statusBooking }: TableOneProps) => {
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
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Bookings
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Time</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">User Name</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">User Email</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Location</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Cancel</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Confirm</h5>
          </div>
        </div>

        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-3 rounded-sm border-b border-stroke bg-gray-1 dark:border-strokedark dark:bg-meta-4 sm:grid-cols-8"
            >
              <div className="p-2.5 xl:p-5">{booking.selectedDate}</div>
              <div className="p-2.5 text-center xl:p-5">{booking.bookingTime}</div>
              <div className="p-2.5 text-center xl:p-5">{booking.employeeUsername}</div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                {booking.empEmail}
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                {booking.query}
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                {booking.status}
              </div>
              <div className="p-2.5 text-center xl:p-5">
                {booking.status !== "cancelled" && (
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openModal(booking._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div className="p-2.5 text-center xl:p-5">
                {booking.status !== "confirmed" && (
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => statusBooking(booking._id, "confirmed")}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="p-5 text-center">No bookings available.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Cancel Booking</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter reason for cancellation..."
              value={reasonOfCancel}
              onChange={(e) => setReasonOfCancel(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleCancel}
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

export default TableTwo;

