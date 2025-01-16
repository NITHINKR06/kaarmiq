import {Employee} from "@/models/employeeModel"; // Adjust the path as needed
import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Establish the database connection
connect();

export async function GET(req: NextRequest) {
    try {
        const empId = await getDataFromToken(req);
        // console.log(empId,'from the api/employee/empdata')

        // Find user without password field
        const user = await Employee.findOne({ _id: empId });

        // console.log(user,'found employee');
        // console.log(user.role);

        if (!user) {
            console.log("Employee not found")
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return user data
        return NextResponse.json({
            message: "User found",
            data: user
        }, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching employees:", {error: error.message});

        // Return an error response in case of failure
        return NextResponse.json(
            { success: false, message: "Error fetching employees" },
            { status: 500 }
        );
    }
}
