import mongoose from "mongoose";
import Booking from "@/models/bookingModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection
connect();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Destructure `id` directly from `params`
    const id = (await params).id
    const url = new URL(request.url);
    const queryType = url.searchParams.get("type"); // "empId" or "userId"

    // Validate query type
    if (!queryType || (queryType !== "empId" && queryType !== "userId")) {
      return NextResponse.json({ error: "Invalid query type" }, { status: 400 });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Find bookings using the query type and ID
    const filter = { [queryType]: id };
    const bookings = await Booking.find(filter).exec();

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ message: "No bookings found" }, { status: 404 });
    }

    return NextResponse.json({ data: bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id // Extract `id` directly from `params`
    const body = await request.json(); // Parse the request body
    const { status, reasonOfCancel } = body;

    // console.log(body,'/api/auth/bookings/${bookingId}')


    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Ensure `reasonOfCancel` is provided if status is "cancelled"
    if (status === "cancelled" && !reasonOfCancel) {
      return NextResponse.json({ error: "Reason for cancellation is required" }, { status: 400 });
    }

    // Prepare the update object
    const updateData: { status?: string; reasonOfCancel?: string } = { status };
    if (status === "cancelled") {
      updateData.reasonOfCancel = reasonOfCancel;
    }

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    ).exec();

    console.log(updatedBooking,'/api/auth/bookings/${bookingId}')

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedBooking }, { status: 200 });
    
  } catch (error:any) {
    console.error("Error updating booking:", {error: error.messgae});
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
