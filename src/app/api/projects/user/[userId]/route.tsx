"use server";
// get project by userId

import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = 1;
    const body = await req.json();
    console.log(body);
    const { name, description } = body;

    const project = await prisma.project.create({
        data: {
            name,
            userId: Number(userId),
        },
    });

    return NextResponse.json(project);
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const projects = await prisma.project.findMany({
        where: {
            userId: Number(1),
        },
    });
    return NextResponse.json(projects);
}
