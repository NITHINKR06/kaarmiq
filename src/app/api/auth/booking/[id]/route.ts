// Import necessary modules
import { NextResponse } from "next/server";
import Booking from "@/models/bookingModel";
import { connect } from "@/dbConfig/dbConfig";

// Establish database connection
connect();

// GET booking by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id

    // Connect to the database

    // Find booking by ID
    const booking = await Booking.findById(id);
    console.log(booking)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}