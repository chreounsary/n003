"use server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
    const id = req.url.split("/").pop();
    const project = await prisma.project.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (project) {
        return NextResponse.json(project);
    } else {
        console.log("Project not found");
    }
}