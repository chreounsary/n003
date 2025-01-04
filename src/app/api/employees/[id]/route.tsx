"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();

/**
 * @description Get all users
 * @returns {NextResponse} JSON response containing array of user objects
 */
export async function GET(req: NextRequest) {
    try {
        const employees = await prisma.employees.findMany();
        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
    }
}

// update employee by ID
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = req.url.split("/").pop();
    try {
        const employee = await prisma.employees.update({
            where: {
                id: Number(id),
            },
            data: {
                name: body.name,
            },
        });
        return NextResponse.json(employee);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
    }
}

// delete employee by ID
export async function DELETE(req: NextRequest) {    
    const id = req.url.split("/").pop();
    try {
        const employee = await prisma.employees.delete({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json(employee);
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
    }
}