import { connect } from "@/dbConfig/dbConfig";
import  User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {Employee} from "@/models/employeeModel";

// Ensure DB connection
connect();

export async function POST(request: Request) {
    // console.log("Login Request Received");

    try {
        // Parse the request body
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // console.log("Request Body:", reqBody);

        // Check if the user exists
        const user = await User.findOne({ email });
        const emp = await Employee.findOne({ email });

        if (!user && !emp) {
            console.error("User or Employee does not exist");
            return NextResponse.json(
                { error: "User or Employee does not exist" },
                { status: 404 }
            );
        }

        let validPassword = false;
        let userToAuthenticate = null;

        // Check if it's a user or an employee and validate password
        if (user) {
            console.log("User found:", user);
            validPassword = await bcryptjs.compare(password, user.password);
            userToAuthenticate = user;
        } 
        if (emp) {
            console.log("Employee found:", emp);
            validPassword = await bcryptjs.compare(password, emp.password);
            userToAuthenticate = emp;
        }

        // If password is invalid, return an error
        if (!validPassword) {
            console.error("Invalid password");
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        // console.log("Password Validated Successfully");

        // Prepare token data based on user or employee
        const tokenData = {
            id: userToAuthenticate._id,
            username: userToAuthenticate.username,
            email: userToAuthenticate.email,
            role: userToAuthenticate.role,
        };

        // Ensure TOKEN_SECRET is set
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            console.error("Environment variable TOKEN_SECRET is not set");
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }

        // Create JWT token
        const token = jwt.sign(tokenData, tokenSecret, { expiresIn: "1d" });

        // console.log("Token Generated:", token);

        // Set token in cookies
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            role: userToAuthenticate.role, // Include role in response
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 24 * 60 * 60, // 1 day
        });

        console.log("Login Successful");
        return response;

    } catch (error: any) {
        console.error("Error during login:", error.message);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
