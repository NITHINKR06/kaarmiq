import mongoose from 'mongoose';
import { type } from 'os';

// Core Employee schema
const employeeSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'jobseeker',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
        details: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EmployeeDetails', // This should correctly reference the EmployeeDetails schema
        },
    },
    { timestamps: true }
);

// EmployeeDetails schema
const employeeDetailsSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            default: 'Empty',
        },
        phoneno: {
            type: String,
            default: '',
        },
        jobRole: {
            type: String,
            default: 'Empty',
        },
        experience: {
            type: String,
            default: 'Empty',
        },
        aboutme: {
            type: String,
            default: 'Empty',
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },
        dob: {
            type: String,
        },
        place: {
            type: String,
            default: 'Empty',
        },
        level: {
            type: String,
            default: '0',
        },
        reviews: [
            {
                reviewText: { type: String },
                username: {type: String},
                rating: { type: Number, min: 1, max: 5 },
                date: { type: Date },
            },
        ],
        imagesOfWork: {
            type: [String],
            default: [],
        },
        salary: {
            type: Number, // Salary in Lakhs
            default: null,
        },
        notifcation: [
            {
              message: { type: String, required: true },
              createdAt: { type: Date, default: Date.now }, // Automatically set the current date
            },
          ],
    },
    { timestamps: true }
);

// Create models
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
const EmployeeDetails = mongoose.models.EmployeeDetails || mongoose.model('EmployeeDetails', employeeDetailsSchema);

export { Employee, EmployeeDetails };