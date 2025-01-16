import { EmployeeDetails } from '@/models/employeeModel';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";


// Establish database connection
connect();

// POST method to submit a review
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { username, review, rating, employeeId, date } = data;

    // Find the employee using the employeeId
    const employeeDetails = await EmployeeDetails.findById(employeeId);

    if (!employeeDetails) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    // Add the review to the employee's reviews array
    employeeDetails.reviews.push({
      reviewText: review,
      username,
      rating,
      date,
    });

    // Save the updated employee details
    await employeeDetails.save();

    return NextResponse.json({ message: 'Review submitted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while submitting the review' }, { status: 500 });
  }
}

// GET method to fetch reviews by employeeId
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); // Use URL searchParams to get query params
    const employeeId = searchParams.get('employeeId'); // Retrieve employeeId from query parameters

    if (!employeeId) {
      return NextResponse.json({ message: 'Employee ID is required' }, { status: 400 });
    }

    // Fetch the employee using the employeeId
    const employeeDetails = await EmployeeDetails.findById(employeeId);

    // console.log(employeeDetails,'@line 50')

    if (!employeeDetails) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    // Return the reviews associated with the employee
    return NextResponse.json({ reviews: employeeDetails.reviews }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
