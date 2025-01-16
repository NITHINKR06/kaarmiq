import { NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id // Get the user ID from the URL parameters
    const body = await req.json(); // Parse the request body

    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: body.username,
          email: body.email,
          password: body.password, // Ensure the password is hashed before saving (not shown here)
          address: body.address,
          phoneNumber: body.phoneNumber,
          notifications: body.notifications,
          isVerified: body.isVerified,
          isAdmin: body.isAdmin,
          role: body.role,
        },
      },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser); // Send back the updated user data
  } catch (error:any) {
    return NextResponse.json(
      { message: 'Error updating user', error: error.message },
      { status: 500 }
    );
  }
}
