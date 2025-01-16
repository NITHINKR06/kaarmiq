import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/bookingModel"; // Assuming this is the path to your model

// Establish database connection
connect();

export async function GET(req: NextRequest) {
    try {
      // Fetch all bookings with only `date` and `status` fields
      const bookings = await Booking.find({}, { selectedDate: 1, status: 1 });

      // console.log(bookings)
  
      return NextResponse.json(
        { success: true, data: bookings },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error fetching bookings:", error.message);
      return NextResponse.json(
        { success: false, message: "Error fetching bookings" },
        { status: 500 }
      );
    }
}
  