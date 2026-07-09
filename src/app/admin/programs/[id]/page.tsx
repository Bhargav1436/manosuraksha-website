import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditProgramForm } from "./edit-program-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params;

  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) notFound();

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/admin/programs"
          className="inline-flex items-center gap-1.5 text-[13px] font-[600] mb-4 hover:underline"
          style={{ color: "#5b7a5e" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Programs
        </Link>
        <h1
          className="font-['Libre_Baskerville',serif] text-[26px] font-bold"
          style={{ color: "#3a3530" }}
        >
          Edit Program
        </h1>
        <p className="mt-1 text-[13px]" style={{ color: "#7a7470" }}>
          Editing: <strong>{program.title}</strong>
        </p>
      </div>

      <div
        className="bg-white rounded-[16px] p-6"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        <EditProgramForm program={program} />
      </div>
    </div>
  );
}
