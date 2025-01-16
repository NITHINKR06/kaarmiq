// pages/api/employees.ts
import {Employee, EmployeeDetails} from "@/models/employeeModel"; // Update the path if necessary
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all employees with their details populated
    const employees = await Employee.find();

    // console.log(employees)
    
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch employee details.' },
      { status: 500 }
    );
  }
}
