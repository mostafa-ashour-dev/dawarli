
import mongoose from "mongoose";
import School from "./models/schoolModel.js";


async function migrateEducationType() {
    try {
        await mongoose.connect("mongodb+srv://mostafaashourdev:mo1ip_2024@superdobercluster.njf7ipp.mongodb.net/dawarli?retryWrites=true&w=majority&appName=SuperDoberCluster");

        const schools = await School.find({});

        for (const school of schools) {
            if (typeof school.educationType === "string") {
                // split by comma and trim spaces
                const arrayTypes = school.educationType
                    .split(",")
                    .map((t) => t.trim());

                school.educationType = arrayTypes;
                await school.save();
            }
        }

        console.log("Migration completed successfully ✅");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed ❌", error);
        process.exit(1);
    }
}

migrateEducationType();