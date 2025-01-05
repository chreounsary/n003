// src/app/api/projects/route.tsx

"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, userId } = body; // Ensure userId is provided

    try {
        const project = await prisma.project.create({
            data: {
                name,
                user: {
                    connect: { id: 1 }, // Connect project to existing user
                },
            },
        });

        return NextResponse.json({
            message: "Project created successfully",
            data: project,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Project not created" }, { status: 400 });
    }
}

// Fetching all projects for a specific user
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    // const userId = searchParams.get("userId");
    const userId = 1;
    const projects = await prisma.project.findMany({
        where: {
            userId: Number(userId),
        },
    });
    return NextResponse.json(projects);
}