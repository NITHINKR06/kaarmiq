import { Employee, EmployeeDetails } from "@/models/employeeModel";
import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

// Establish database connection
connect();

export async function PUT(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log(body, 'data caught in PUT API /api/employee/empupdate');

    const { employeeId, ...updateData } = body;

    // Check if the employeeId is provided
    if (!employeeId) {
      return NextResponse.json(
        { success: false, message: "Employee ID is required" },
        { status: 400 }
      );
    }
    console.log(employeeId, 'check if employeeId is their or not /api/employee/empupdate');

    // Find and update the employee record or create a new one
    const updatedEmployee = await EmployeeDetails.findByIdAndUpdate(
      employeeId,
      updateData,
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if it doesn't exist
        setDefaultsOnInsert: true // Apply default values for fields
      }
    );

    console.log(updatedEmployee, 'check if update or create /api/employee/empupdate');

    if (updatedEmployee) {
      updatedEmployee.notifcation = updatedEmployee.notifcation || [];
      updatedEmployee.notifcation.push({
        type: "Account update",
        message: `Your account status has been updated to: ${updateData}`,
      });
      await updatedEmployee.save();
    }

    // Return a success response with the updated employee data
    return NextResponse.json(
      { success: true, data: updatedEmployee },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error updating or creating employee:", { error: error.message });

    // Return an error response in case of failure
    return NextResponse.json(
      { success: false, message: "Error updating or creating employee" },
      { status: 500 }
    );
  }
}
