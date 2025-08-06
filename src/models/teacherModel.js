import mongoose from "mongoose";


const TeacherSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Teacher name is required"],
        trim: true,
    },

    avatar: {
        type: String,
        default: "",

    },
    description: {
        type: String,
        required: [true, "Teacher description is required"],
        trim: true,
    },
    stagesTaught: {
        type: String,
        required: [true, "Teacher stagesTaught is required"],
        trim: true,
    },
    subject: {
        type: String,
        required: [true, "Teacher subject is required"],
        trim: true,
    },
    educationType: {
        type: String,
        required: [true, "Teacher educationType is required"],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "Teacher gender is required"],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Teacher phone is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "Teacher city is required"],
        trim: true,
    },
}, { timestamps: true });


const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

export default Teacher;