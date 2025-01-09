//UpdateTaskStatus by project id and status
"use server";
import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const projectId = body.projectId;
    const taskId = body.taskId;
    const status = body.status;
    console.log('body', body);

    const task = await prisma.task.update({
        where: {
            id: Number(taskId),
        },
        data: {
            status: body.status,
        },
    });
    if (!task) {
        return NextResponse.json({ error: "Task not updated" }, { status: 400 });
    }
    return NextResponse.json('Task updated successfully');
}