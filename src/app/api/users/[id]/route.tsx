"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
/**
 * @description Get all users
 * @returns {NextResponse} JSON response containing array of user objects
 */
export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

/**
 * @description Update user by ID
 * @param {NextApiRequest} req - Next.js API request object
 * @param {NextApiResponse} res - Next.js API response object
 * @returns {NextResponse} JSON response containing updated user object
 */
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = req.url.split("/").pop();
    const { name, email } = body;
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const user = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            email
        }
    });
    return NextResponse.json(user);
}

/**
 * @description Delete user by ID
 * @param {NextApiRequest} req - Next.js API request object
 * @param {NextApiResponse} res - Next.js API response object
 * @returns {NextResponse} JSON response containing deleted user object
 */
export async function DELETE(req: NextRequest) {
    const id = req.url.split("/").pop();
   try {
    const user = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    return NextResponse.json(user);
   } catch (error) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
   }
}