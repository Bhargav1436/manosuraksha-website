import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  return verifySession(token);
}

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const programs = await prisma.program.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(programs);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, subtitle, description, image, conditions, isActive, displayOrder } = body;

  if (!title || !slug)
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });

  const existing = await prisma.program.findUnique({ where: { slug } });
  if (existing)
    return NextResponse.json({ error: "Slug already exists" }, { status: 400 });

  const program = await prisma.program.create({
    data: {
      title,
      slug,
      subtitle: subtitle ?? null,
      description: description ?? null,
      image: image ?? null,
      conditions: conditions ?? [],
      isActive: isActive ?? true,
      displayOrder: displayOrder ?? 0,
    },
  });

  return NextResponse.json(program, { status: 201 });
}
