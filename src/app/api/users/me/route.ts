import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    // console.log("Entred the users me api")

    try {
        // console.log(request)
        // Retrieve user ID from the token
        const userId = await getDataFromToken(request);
        // console.log(userId)

        // Find user without password field
        const user = await User.findOne({ _id: userId });
        // console.log(user.role)

        // console.log(user,'found user')

        // If user is not found
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return user data
        return NextResponse.json({
            message: "User found",
            data: user
        }, { status: 200 });

    } catch (error: any) {
        console.log({error: error.message})
        // Handle error
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
