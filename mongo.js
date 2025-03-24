const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = "mongodb://divansan05:Divansan0076@loginformpractice-shard-00-00.vlg9n.mongodb.net:27017,loginformpractice-shard-00-01.vlg9n.mongodb.net:27017,loginformpractice-shard-00-02.vlg9n.mongodb.net:27017/mydatabase?replicaSet=atlas-nbf2o3-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=LoginFormPractice";

// ✅ User Schema (For Login & Password Reset)
const logInSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, required: true, unique: true },
    role: String,
    username: String,
    password: String,
    resetOTP: { type: String }, // Store OTP for password reset
    otpExpiry: { type: Date } // Expiry time for OTP
}, { collection: "logincollections" });

const LogInCollection = mongoose.model("LogInCollection", logInSchema);

const studentSchema = new mongoose.Schema({
    applicationNo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[A-Za-z0-9\s.'-]+$/, "Invalid application number format"]
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        match: [/^[A-Za-z\s.'-]+$/, "Invalid name format"]
    },
    registerNo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, "Invalid register number format (must be 12 digits)"]
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value < new Date();
            },
            message: "Date of birth must be in the past"
        }
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    department: { type: String, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, trim: true },
    mobileNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Invalid mobile number format (must be 10 digits)"],
        trim: true
    },
    aadharNo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, "Invalid Aadhaar number format (must be 12 digits)"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z\s]+$/, "Invalid nationality format"]
    },
    religion: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z\s]+$/, "Invalid religion format"]
    },
    community: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z\s]+$/, "Invalid community format"]
    },
    motherTongue: { type: String, required: true, trim: true },
    modeOfAdmission: { type: String, required: true, trim: true },
    selectedGroup: { type: String, required: true, trim: true },
    cutoff: {
        type: Number,
        required: true,
        min: 0,
        max: 200,
    },
    year: { type: String, enum: ["I", "II", "III", "IV"], required: true, trim: true },
    hostel: { type: String, enum: ["Hosteller", "Day Scholar"], required: true, trim: true },
    regular: { type: String, enum: ["Regular", "Lateral"], required: true, trim: true },
    first: { type: String, enum: ["Yes", "No"], trim: true },

    address: {
        doorNo: {
            type: String,
            required: true,
            trim: true,
            match: [/^[A-Za-z0-9\s.,/-]+$/, "Invalid door number format"]
        },
        street: {
            type: String,
            required: true,
            trim: true,
            match: [/^[A-Za-z0-9\s.,/-]+$/, "Invalid street format"]
        },
        villageCity: {
            type: String,
            required: true,
            trim: true,
            match: [/^[A-Za-z0-9\s.,/-]+$/, "Invalid village/city format"]
        },
        state: {
            type: String,
            required: true,
            trim: true,
            match: [/^[A-Za-z0-9\s.,/-]+$/, "Invalid state format"]
        },
        district: {
            type: String,
            required: true,
            trim: true,
            match: [/^[A-Za-z0-9\s.,/-]+$/, "Invalid district format"]
        },
        pinCode: {
            type: String,
            required: true,
            match: [/^\d{6}$/, "Invalid pincode format (must be 6 digits)"],
            trim: true
        }
    },

    parents: {
        father: {
            name: {
                type: String,
                required: true,
                trim: true,
                match: [/^[A-Za-z\s.'-]+$/, "Invalid father name format"]
            },
            occupation: {
                type: String,
                required: true,
                trim: true,
                match: [/^[A-Za-z\s.'-]+$/, "Invalid father occupation format"]
            },
            mobile: {
                type: String,
                required: true,
                match: [/^\d{10}$/, "Invalid mobile number format (must be 10 digits)"],
                trim: true
            },
            annualIncome: {
                type: Number,
                required: true,
                min: 0
            }
        },
        mother: {
            name: {
                type: String,
                required: true,
                trim: true,
                match: [/^[A-Za-z\s.'-]+$/, "Invalid mother name format"]
            },
            occupation: {
                type: String,
                required: true,
                trim: true,
                match: [/^[A-Za-z\s0-9.'-]+$/, "Invalid mother occupation format"]
            },
            mobile: {
                type: String,
                required: true,
                match: [/^\d{10}$/, "Invalid mobile number format (must be 10 digits)"],
                trim: true
            },
            annualIncome: {
                type: Number,
                required: true,
                min: 0
            }
        }
    },

    schoolDetails: [{
        classLevel: { type: String, enum: ["VI", "VII", "VIII", "IX", "X", "XI", "XII"], required: true },
        name: {
            type: String,
            required: true,
            trim: true,
            match: [/^[A-Za-z0-9\s.,/'-]+$/, "Invalid school name format"]
        },
        marks: {
            type: mongoose.Schema.Types.Mixed, // Allow Number or String
            required: true,
            validate: {
                validator: function (value) {
                    if (typeof value === 'number') {
                        return value >= 0 && value <= 600;
                    } else if (typeof value === 'string') {
                        return value.toLowerCase() === 'pass' || value.toLowerCase() === 'all pass';
                    }
                    return false;
                },
                message: 'Marks must be a number between 0 and 600 or "Pass" or "All Pass"'
            }
        },
        passingYear: {
            type: Number,
            required: true,
            min: 1900,
            max: new Date().getFullYear() + 10,
        }
    }],

    twelfthSubjectMarks: [{
        subjectName: { type: String, required: true },
        marksObtained: { type: mongoose.Schema.Types.Mixed, required: true, min: 0, max: 100 }, // Allow Number or String
        yearOfPassing: { type: Number, required: true, min: 1900, max: new Date().getFullYear() +10 }
    }],

    mediumOfInstruction: { type: String, required: true, trim: true },

    documents: {
        aadharCard: { type: String, default: null },
        communityCertificate: { type: String, default: null },
        tenthMarkSheet: { type: String, default: null },
        eleventhMarkSheet: { type: String, default: null },
        twelfthMarkSheet: { type: String, default: null },
        transferCertificate: { type: String, default: null },
        birthCertificate: { type: String, default: null },
        firstCertificate: { type: String, default: null },
        photo: { type: String, default: null },
        studentSignature: { type: String, default: null }
    },

    admissionStatus: {
        status: { type: String, enum: ["Pending", "Admitted", "Rejected"], required: true },
     // Add remarks field
      },
    missingFields: [String],

    feesDetails: [
        {
            feeType: String,
            allocatedFees: Number,
            date: Date,
            upi: String,
            paidUnpaid: String,
            pending: String,
            reducedFee: String,
            concessionReason: String,
        }
    ]
}, 
{
    collection: "students",
    timestamps: true
});


// ✅ Fees Schema
const feesSchema = new mongoose.Schema({
    tuition: [
        {
            branch: String,
            fg: String,
            nonFg: String,
            gq: String,
            mq: String,
            reducedFee: { type: String, default: '' },
            concessionReason: { type: String, default: '' },
        },
    ],
    hostel: [
        {
            branch: String,
            bcMbc: String,
            scSt: String,
            reducedFee: { type: String, default: '' },
            concessionReason: { type: String, default: '' },
        },
    ],
});

const Fees = mongoose.model("Fees", feesSchema, "fees");
const Students = mongoose.model("Students", studentSchema, "students");

module.exports = { LogInCollection, Students,Fees };