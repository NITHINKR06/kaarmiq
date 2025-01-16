'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";

interface CalendarProps {
  onDateChange: (date: string) => void;
  bookedDate: string | null;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange, bookedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [confirmedBookings, setConfirmedBookings] = useState<string[]>([]); // Array to store confirmed dates
  const [pendingBookings, setPendingBookings] = useState<string[]>([]); // Array to store pending dates
  const [check, setCheck] = useState<string[]>([]);

  const pendingDates = check
    .filter((booking: any) => booking.status === 'pending')
    .map((booking: any) => booking.selectedDate);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  const handleDayClick = (day: number | null) => {
    if (
      day &&
      !confirmedBookings.includes(
        `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`) &&
      !pendingDates.includes(
        `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
      )
    ) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      onDateChange(formatDate(selectedDate)); // Pass formatted date to the callback
    }
  };

  const calendarDays = generateCalendar();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/auth/getBookingDate');
        const bookings = response.data.data;

        setCheck(bookings);

        // Extract dates where status is 'confirmed'
        const confirmedDates = bookings
          .filter((booking: any) => booking.status === 'confirmed')
          .map((booking: any) => booking.selectedDate);
        setConfirmedBookings(confirmedDates); // Update confirmedBookings state

      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);


  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePreviousMonth}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded transition"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold text-gray-700">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={handleNextMonth}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded transition"
          >
            Next
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-hidden border rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="grid grid-cols-7 bg-indigo-500 text-white text-center text-xs font-medium">
                {daysOfWeek.map((day, index) => (
                  <th key={index} className="py-2">
                    <span className="hidden lg:block">{day}</span>
                    <span className="block lg:hidden">{day.substring(0, 3)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, rowIndex) => (
                <tr key={rowIndex} className="grid grid-cols-7">
                  {calendarDays.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, cellIndex) => {
                    const isToday =
                      day &&
                      today.getDate() === day &&
                      today.getMonth() === currentDate.getMonth() &&
                      today.getFullYear() === currentDate.getFullYear();

                    const isBooked =
                      day &&
                      confirmedBookings.includes(
                        `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                      );

                    const isPending =
                      day &&
                      pendingDates.includes(
                        `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                      );

                    return (
                      <td
                        key={cellIndex}
                        className={`h-12 flex items-center justify-center text-xs font-medium transition border-black-2 ${
                          day
                            ? isToday
                              ? "bg-indigo-500 text-white rounded-lg shadow-md"
                              : isBooked
                              ? "bg-red-300 text-white cursor-not-allowed rounded-lg"
                              : isPending
                              ? "bg-yellow-100 text-black-2 cursor-pointer rounded-lg"
                              : "bg-white text-gray-800 hover:bg-gray-100 cursor-pointer rounded-lg"
                            : "bg-gray-50"
                        }`}
                        onClick={() => handleDayClick(day)}
                        style={{ pointerEvents: day && !isBooked ? "auto" : "none" }}
                      >
                        {day && <span>{day}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
