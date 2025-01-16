import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/sendmail";
import { Employee } from "@/models/employeeModel";

connect();

type Data = {
  message?: string;
  error?: string;
  new?: string;
};

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, role } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const userEmp = await Employee.findOne({ email });
    if (userEmp) {
      return NextResponse.json({ error: "Employee already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    if (role === "user") {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();

      // Send verification email
      // await sendEmail({
      //   email,
      //   emailType: "VERIFY",
      // });

      return NextResponse.json({
        message: "User created successfully",
        success: true,
      });
    } else if (role === "employee") {
      const newEmp = new Employee({
        username,
        email,
        password: hashedPassword,
        role,
      });
      await newEmp.save();

      // Send verification email
      // await sendEmail({
      //   email,
      //   emailType: "VERIFY",
      // });

      return NextResponse.json({
        message: "Employee created successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Invalid role specified",
        success: false,
      });
    }
  } catch (error: any) {
    console.log({ error: error.message }, "This is from the signup page");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
