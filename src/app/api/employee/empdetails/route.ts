import { Employee, EmployeeDetails } from "@/models/employeeModel";
import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

// Establish database connection
connect();

export async function GET(request: Request) {
    try {
        // console.log("Employee Details API from /api/employee/empdetails");
        // Extract query parameters from the request URL
        const { searchParams } = new URL(request.url);
        const employeeId = searchParams.get("employeeId"); // Assuming the identifier is passed as a query parameter

        // console.log(employeeId,'Employee API data')
        if (!employeeId) {
            return NextResponse.json(
                { error: "Employee ID is required" },
                { status: 400 }
            );
        }

        // Fetch employee details
        const employeeDetails = await EmployeeDetails.findOne({ _id: employeeId });
        // console.log(employeeDetails,'data from employee details /api/employee/empdeetails')

        if (!employeeDetails) {
            return NextResponse.json(
                { error: "Employee details not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: employeeDetails }, { status: 200 });
    } catch (error: any) {
        console.log({ error: error.message }, " error in Employee Details API /api/employee/empdetails");
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
