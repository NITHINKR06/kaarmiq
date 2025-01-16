import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/bookingModel"; // Assuming this is the path to your model
import { sendEmail } from "@/helpers/sendmail"; // Import the correct sendEmail function

// Establish database connection
connect();

export async function POST(req: NextRequest) {

  try {
    // Parse the request body
    const body = await req.json();

    // Destructure the booking details from the body
    const { empId, userId, userName, employeeUsername, jobRole, empEmail, userEmail, query, selectedDate, bookingTime } = body;

    // Validate input data
    if (!empId || !employeeUsername || !userName || !jobRole || !empEmail || !userEmail || !selectedDate || !bookingTime || !userId || !query) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new booking entry
    const newBooking = new Booking({
      empId,
      userId,
      userName,
      employeeUsername,
      jobRole,
      empEmail,
      userEmail,
      query,
      selectedDate,
      bookingTime,
      status: "pending", // Default status
    });

    // Save the new booking to the database
    await newBooking.save();

    const userSubject = "Booking Confirmation";
    const userText = `Hello ${userName}, your booking has been successfully created for ${selectedDate} at ${bookingTime}.`;
    const employeeSubject = "New Booking Request";
    const employeeText = `Hello ${employeeUsername}, a new booking has been made by ${userName} for ${selectedDate} at ${bookingTime}.`;

    // Call sendEmail with 3 separate arguments as expected
    await sendEmail(userEmail, userSubject, userText);
    await sendEmail(empEmail, employeeSubject, employeeText);

    // Return a success response
    return NextResponse.json(
      { success: true, message: "Booking created successfully", data: newBooking },
      { status: 201 }
    );

  } catch (error: any) {
    console.log("Error creating booking:", error.message);

    // Return an error response in case of failure
    return NextResponse.json(
      { success: false, message: "Error creating booking" },
      { status: 500 }
    );
  }

}

export async function PUT(req: NextRequest) {

  try {
    // Parse the request body
    const body = await req.json();
    const { bookingId, updates } = body;

    // Validate input data
    if (!bookingId || !updates) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: updates },
      { new: true } // Return the updated document
    );

    // Check if the booking was found and updated
    if (!updatedBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // Return the updated booking
    return NextResponse.json(
      { success: true, message: "Booking updated successfully", data: updatedBooking },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error updating booking:", error.message);

    // Return an error response
    return NextResponse.json(
      { success: false, message: "Error updating booking" },
      { status: 500 }
    );
  }

}
