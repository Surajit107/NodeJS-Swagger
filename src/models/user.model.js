// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        index: true,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        index: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        default: '',
    },
    dob: {
        type: Date,
        default: null,
    },
    phone: {
        type: String,
        default: '',
    },
    password: {
        type: String,
    },
    rawPassword: {
        type: String,
    },
    oldPassword: {
        type: String,
    },
    avatar: {
        type: String,
        default: '',
    },
    coverImage: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        enum: [
            'SuperAdmin',
            'ServiceProvider',
            'Customer',
            'FieldAgent',
            'TeamLead',
            'Admin',
            'Finance',
            'Guest',
            'Operator',
            'Support',
        ],
        default: 'Customer',
    },
    refreshToken: {
        type: String,
        default: '',
    },
    fcmToken: {
        type: String,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    geoLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
        },
    },
}, { timestamps: true });

// Geospatial index for querying by location
UserSchema.index({ geoLocation: '2dsphere' });

// Pre-save hook to hash passwords
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password method
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phone: this.phone,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Generate Refresh Token
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;