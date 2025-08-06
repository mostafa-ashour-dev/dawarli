import mongoose from "mongoose";


const SchoolSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "School title (name) is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "School description is required"],
    },
    location: {
        type: [
            {
                address: {
                    type: String,
                    required: true,
                },
                lat: {
                    type: Number,
                    required: true,
                },
                lng: {
                    type: Number,
                    required: true,
                },
            },
        ] || null,
    },
    educationType: {
        type: String,
        required: true,
    },
    rating: {
        type: Number || null,
    },
    image: {
        type: String,
        required: true,
    }
}, {timestamps: true});


const School = mongoose.models.School || mongoose.model("School", SchoolSchema);

export default School;