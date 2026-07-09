import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  programSlug: z.string().optional(),
  authorName: z.string().min(2).max(100),
  authorEmail: z.string().email(),
  content: z.string().min(10).max(1000),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      programSlug: parsed.data.programSlug ?? null,
      authorName: parsed.data.authorName,
      authorEmail: parsed.data.authorEmail,
      content: parsed.data.content,
      status: "pending",
    },
  });

  return NextResponse.json({ success: true, id: comment.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const programSlug = searchParams.get("programSlug");

  const comments = await prisma.comment.findMany({
    where: {
      status: "approved",
      ...(programSlug ? { programSlug } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      authorName: true,
      content: true,
      createdAt: true,
      programSlug: true,
    },
  });

  return NextResponse.json(comments);
}
