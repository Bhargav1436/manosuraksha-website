import { prisma } from "@/lib/prisma";
import { ProgramsClient } from "./programs-client";

export default async function AdminProgramsPage() {
  const raw = await prisma.program.findMany({
    orderBy: { displayOrder: "asc" },
  });

  // Serialize Prisma objects (Date → string) before passing to client component
  const programs = raw.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    subtitle: p.subtitle ?? null,
    description: p.description ?? null,
    image: p.image ?? null,
    conditions: p.conditions ?? [],
    isActive: p.isActive ?? true,
    displayOrder: p.displayOrder ?? 0,
  }));

  return (
    <div className="p-4 md:p-8">
      <ProgramsClient programs={programs} />
    </div>
  );
}
