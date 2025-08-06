import { NextResponse } from "next/server";
import connectToDB  from "@/lib/mongoose";
import School from "@/models/schoolModel";

export async function GET(request) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const query = searchParams.get("query") || "";
        const type = searchParams.get("type") || "all";
        const city = searchParams.get("city") || "all";
        const overview = parseFloat(searchParams.get("overview") || "5");

        const filter = {};

        if (type.toLowerCase() !== "all") {
            filter.educationType = { $regex: new RegExp(type, "i") };
        }

        if (city.toLowerCase() !== "all") {
            filter["location.0.address"] = { $regex: new RegExp(city, "i") };
        }

        if (overview) {
            filter.rating = { $gte: overview };
        }

        if (query) {
            filter.title = { $regex: new RegExp(query, "i") };
        }

        const total = await School.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const schools = await School.find(filter)
            .sort({ rating: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const pageInfo = {
            nextPage: page * limit < total ? { page: page + 1, limit } : null,
            prevPage: page > 1 ? { page: page - 1, limit } : null,
        };

        return NextResponse.json({
            success: true,
            message: "Schools Fetched Successfully",
            count: schools.length,
            totalCount: total,
            totalPages,
            page,
            next: pageInfo.nextPage,
            prev: pageInfo.prevPage,
            schools,
        });
    } catch (error) {
        console.error("Failed to fetch schools:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
