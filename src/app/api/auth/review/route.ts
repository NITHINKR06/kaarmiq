import { EmployeeDetails } from '@/models/employeeModel';
import { NextRequest } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";

// Establish database connection
connect();

export async function GET(req: Request) {
    try {
        // Connect to the database

        // Fetch all reviews from EmployeeDetails collection
        const reviews = await EmployeeDetails.find({}, 'reviews').lean();

        if (!reviews || reviews.length === 0) {
            return new Response(JSON.stringify({ message: 'No reviews found' }), { status: 404 });
        }

        // Flatten all reviews into a single array
        const allReviews = reviews.flatMap(detail => detail.reviews);

        return new Response(JSON.stringify({ success: true, reviews: allReviews }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}