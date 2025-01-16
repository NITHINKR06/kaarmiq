'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TableOne from "@/components/Tables/TableOne";
import NavBar from "@/components/NavBar/Navbar";
import { User } from "@/types/user"; // Assuming you have the User type defined

export default function TablesPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data.data); // Assuming response.data.data contains user info
        toast.success('Employee details found!');
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("User not found");
      }
    };

    fetchUserData();
  }, []);

  const userId = user?._id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/auth/bookings/${userId}?type=userId`);
          const data = response.data.data;
          
          // Ensure the data is an array
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setBookings([]);
          }
        } catch (error) {
          setError("Error fetching bookings.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookings();
  }, [userId]);

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
    <div className="">
      <NavBar />
      <div className="flex flex-col gap-10 p-10 mt-15">
        <TableOne
          bookings={bookings}
          isLoading={isLoading}
          error={error}
          statusBooking={statusBooking}
        />
      </div>
    </div>
  );
}
