import connectDB from "@/lib/mongoose";
import Teacher from "@/models/teacherModel";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const query = searchParams.get("query") || "";
    const city = searchParams.get("city") || "all";
    const type = searchParams.get("type") || "all";
    const stages = searchParams.get("stagesTaught") || "all";
    const subject = searchParams.get("subject") || "all";

    const filter = {};

    if (type.toLowerCase() !== "all") {
        filter.educationType = { $regex: type, $options: "i" };
    }

    if (subject.toLowerCase() !== "all") {
        filter.subject = { $regex: subject, $options: "i" };
    }

    if (stages.toLowerCase() !== "all") {
        filter.stagesTaught = { $regex: stages, $options: "i" };
    }

    if (city.toLowerCase() !== "all") {
        filter.city = { $regex: city, $options: "i" };
    }

    if (query) {
        filter.name = { $regex: query, $options: "i" };
    }

    try {
        const total = await Teacher.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const teachers = await Teacher.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({
            success: true,
            message: "Teachers Fetched Successfully",
            count: teachers.length,
            totalCount: total,
            totalPages,
            page,
            next: (page * limit < total) ? { page: page + 1, limit } : null,
            prev: (page > 1) ? { page: page - 1, limit } : null,
            teachers,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server Error",
            error: error.message,
        }, { status: 500 });
    }
}
