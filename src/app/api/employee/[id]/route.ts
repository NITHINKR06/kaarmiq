import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import {Employee} from '@/models/employeeModel';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  
  try {
    const id = (await params).id
    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid employee ID' }, { status: 400 });
    }

    // Find the employee by ID
    const employee = await Employee.findById(id);
    // console.log(employee,' from the employee/[id] ')
    if (!employee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    // Return the employee data
    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
