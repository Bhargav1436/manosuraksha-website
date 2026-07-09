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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  try {
    const program = await prisma.program.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.conditions !== undefined && { conditions: body.conditions }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.displayOrder !== undefined && { displayOrder: Number(body.displayOrder) }),
      },
    });
    return NextResponse.json(program);
  } catch (err) {
    console.error("PATCH program error:", err);
    return NextResponse.json({ error: "Failed to update program." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.program.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
