"use server";
import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

//add task to projects
export async function POST(req: NextRequest) {
    const body = await req.json();
    const task = await prisma.task.create({
        data: {
            title: body.title,
            priority: TaskPriority.LOW,
            status: "PENDING",
            project: {
                connect: { id: body.projectId },
            },
            user: {
                connect: { id: body.userId },
            }
        },
    })
    if (!task) {
        return NextResponse.json({ error: "Task not created" }, { status: 400 });
    }

    return NextResponse.json('Task created successfully');
}

//get all tasks by project id and status to-do
export async function GET(req: NextRequest) {
    const projectId = req.url.split("/").pop();
    const id = Number(projectId);
    const tasks = await prisma.task.findMany({
        where: {
            projectId: 2
        },
    });
    return NextResponse.json(tasks);
}