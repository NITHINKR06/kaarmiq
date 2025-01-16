import bcryptjs from "bcryptjs";
import { Employee } from "@/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { oldPassword, newPassword, passKey } = await req.json();

    // Validate inputs
    if (!oldPassword || !newPassword || !passKey) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Find user using the passKey
    const user = await Employee.findOne({ verifyToken: passKey }); // Assuming passKey matches the field 'verifyToken'
    if (!user) {
      return NextResponse.json({ message: "Invalid pass key" }, { status: 404 });
    }

    // Compare old password with the stored hashed password
    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update the password and clear the passKey
    user.password = hashedPassword;
    user.verifyToken = null; // Clear the passKey after use
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
