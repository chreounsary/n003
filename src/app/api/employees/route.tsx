"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {

    const body = await req.json();
    const { name, email } = body;
    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    });

    if (user) {
        return NextResponse.json({
            message: "User created successfully",
            data: user
        });
    }
    return NextResponse.json({ error: "User not created" }, { status: 400 });
}

/**
 * @description Get all users
 * @returns {NextResponse} JSON response containing array of user objects
 */
export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}
