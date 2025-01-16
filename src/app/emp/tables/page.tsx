'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavBarEmpProfile from "@/components/NavBar/NavBarEmpProfile";
import TableTwo from "@/components/Tables/TableTwo";
import { Employee } from "@/types/employee"; // Assuming you have the Employee type defined

export default function TablesPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [employee, setEmployee] = useState<Employee | null>(null);

  // Fetch employee data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/employee/empdata');
        setEmployee(response.data.data); // Assuming response.data.data contains user info
        toast.success('Employee details found!');
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast.error("User not found");
      }
    };

    fetchUserData();
  }, []);

  const empId = employee?._id;

  // Fetch bookings based on employee ID
  useEffect(() => {
    const fetchBookings = async () => {
      if (empId) {
        try {
          const response = await axios.get(`/api/auth/bookings/${empId}?type=empId`);
          const data = response.data.data;

          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setBookings([]);
          }
        } catch (err) {
          console.error('Error fetching bookings:', err);
          setError("Error fetching bookings.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookings();
  }, [empId]);

  // Function to update booking status
  const statusBooking = async (
    bookingId: string,
    newStatus: "cancelled" | "confirmed",
    reasonOfCancel?: string
  ) => {
    try {
      const updatedBooking = {
        status: newStatus,
        selectedDate: new Date().toISOString(), // Set the current date when updated
        ...(newStatus === "cancelled" && { reasonOfCancel }), // Include reasonOfCancel only if status is "cancelled"
      };

      const response = await axios.patch(`/api/auth/bookings/${bookingId}`, updatedBooking);
      const data = response.data.data;

      toast.success(`Booking ${newStatus} successfully!`);

      // Update the bookings state with the updated booking
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === data._id ? data : booking
        )
      );
    } catch (err) {
      console.error(`Failed to ${newStatus} the booking:`, err);
      toast.error(`Failed to ${newStatus} the booking.`);
    }
  };

  return (
    <div>
      <NavBarEmpProfile />

      <div className="flex flex-col gap-10 p-10 mt-15">
        <TableTwo
          bookings={bookings}
          isLoading={isLoading}
          error={error}
          statusBooking={statusBooking}
        />
      </div>
    </div>
  );
}
