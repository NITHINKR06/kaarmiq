// pages/api/employees.ts
import {Employee, EmployeeDetails} from "@/models/employeeModel"; // Update the path if necessary
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all employees with their details populated
    const employeesDetails = await EmployeeDetails.find();

    // console.log(employeesDetails)
    

    return NextResponse.json({ success: true, data: employeesDetails });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch employee details.' },
      { status: 500 }
    );
  }
}
