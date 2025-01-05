"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name } = body;
    const employees = await prisma.employees.create({
        data: {
            name
        }
    });

    if (employees) {
        return NextResponse.json({
            message: "employees created successfully",
            data: employees
        });
    }
    return NextResponse.json({ error: "User not created" }, { status: 400 });
}

// Fetching data employees and filter by name

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    const employees = await prisma.employees.findMany();
    return NextResponse.json(employees);
}
