import { NextResponse } from "next/server";
import schoolData from "@/constants/schoolsEn.json";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const query = searchParams.get("query") || "";
    const type = searchParams.get("type") || "all";
    const city = searchParams.get("city") || "all";

    let filteredSchools = [...schoolData];
    if (type.toLowerCase() !== "all") {
        filteredSchools = filteredSchools.filter(
            (school) => school.educationType?.toLowerCase() === type.toLowerCase()
        );
    }

    if (city.toLowerCase() !== "all") {
        filteredSchools = filteredSchools.filter(
            (school) => school.location?.[0]?.address?.toLowerCase().includes(city.toLowerCase())
        );
    }

    if (query) {
        filteredSchools = filteredSchools.filter((school) =>
            school.title?.toLowerCase().includes(query.toLowerCase())
        );
    }

    const total = filteredSchools.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredSchools.slice(startIndex, endIndex);

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
        schools: paginatedData,
    });
}
