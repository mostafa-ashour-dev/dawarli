import { NextResponse } from "next/server";
import teachersData from "@/constants/teachersEn.json";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const query = searchParams.get("query") || "";
    const city = searchParams.get("city") || "all";
    const type = searchParams.get("type") || "all";
    const stages = searchParams.get("stagesTought") || "all";

    let filterdTeachers = [...teachersData];
    if (type.toLowerCase() !== "all") {
        filterdTeachers = filterdTeachers.filter(
            (school) => school.educationType?.toLowerCase() === type.toLowerCase()
        );
    }

    if (stages.toLowerCase() !== "all") {
        filterdTeachers = filterdTeachers.filter(
            (teacher) => teacher.stagesTought?.toLowerCase().includes(stages.toLowerCase())
        );
    }

    if (city.toLowerCase() !== "all") {
        filterdTeachers = filterdTeachers.filter(
            (teacher) => teacher.city?.toLowerCase().includes(city.toLowerCase())
        );
    }

    if (query) {
        filterdTeachers = filterdTeachers.filter((teacher) =>
            teacher.name?.toLowerCase().includes(query.toLowerCase())
        );
    }

    const total = filterdTeachers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filterdTeachers.slice(startIndex, endIndex);

    const pageInfo = {
        nextPage: endIndex < total ? { page: page + 1, limit } : null,
        prevPage: startIndex > 0 ? { page: page - 1, limit } : null,
    };

    return NextResponse.json({
        success: true,
        message: "Schools Fetched Successfully",
        count: paginatedData.length,
        totalCount: total,
        totalPages,
        page,
        next: pageInfo.nextPage,
        prev: pageInfo.prevPage,
        teachers: paginatedData,
    });
}
