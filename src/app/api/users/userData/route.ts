import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET() {
    try {
        // Fetch all users from the database
        const users = await User.find({});
        
        // Check if there are users
        if (users.length === 0) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Users retrieved successfully",
            users
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
