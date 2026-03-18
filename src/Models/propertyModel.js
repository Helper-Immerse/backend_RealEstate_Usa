const mongoose = require("mongoose");
const validator = require("validator");

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: false,
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description: {
            type: String,
            required: false,
        },

        price: {
            type: Number,
            required: false,
        },

        currency: {
            type: String,
            default: "EUR",
            required: false,
        },

        location: {
            city: {
                type: String,
                required: false,
            },
            area: {
                type: String,
                required: false,
            },
            address: {
                type: String,
                required: false,
            },
        },

        propertyType: {
            type: String,
            enum: ["Apartment", "Villa", "Penthouse", "Studio", "Plot"],
            required: false,
        },

        status: {
            type: String,
            enum: ["Available", "Sold", "Booked"],
            default: "Available",
            required: false,
        },

        images: [
            {
                url: String,
                publicId: String
            }
        ],

        amenities: [
            {
                type: String,
                required: false,
            },
        ],

        highYield: {
            type: Boolean,
            default: false,
            required: false,
        },

        projectedYield: {
            type: Number,
            required: false,
        },

        capitalAppreciation: {
            type: Number,
            required: false,
        },

        bedrooms: {
            type: Number,
            required: false,
        },

        bathrooms: {
            type: Number,
            required: false,
        },

        areaSize: {
            type: Number,
            required: false,
        },

        listedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Properties", propertySchema);