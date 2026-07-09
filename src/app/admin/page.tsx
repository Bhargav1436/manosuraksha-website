import { prisma } from "@/lib/prisma";
import { BookOpen, MessageSquare, CheckCircle, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const [totalPrograms, activePrograms, totalComments, pendingComments] =
    await Promise.all([
      prisma.program.count(),
      prisma.program.count({ where: { isActive: true } }),
      prisma.comment.count(),
      prisma.comment.count({ where: { status: "pending" } }),
    ]);

  const recentComments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    {
      label: "Total Programs",
      value: totalPrograms,
      sub: `${activePrograms} active`,
      icon: BookOpen,
      color: "#5b7a5e",
      bg: "rgba(91,122,94,0.1)",
    },
    {
      label: "Inactive Programs",
      value: totalPrograms - activePrograms,
      sub: "deactivated",
      icon: BookOpen,
      color: "#c4956a",
      bg: "rgba(196,149,106,0.1)",
    },
    {
      label: "Total Comments",
      value: totalComments,
      sub: "all time",
      icon: MessageSquare,
      color: "#6b8b8b",
      bg: "rgba(107,139,139,0.1)",
    },
    {
      label: "Pending Approval",
      value: pendingComments,
      sub: "needs review",
      icon: Clock,
      color: pendingComments > 0 ? "#dc2626" : "#5b7a5e",
      bg: pendingComments > 0 ? "rgba(220,38,38,0.08)" : "rgba(91,122,94,0.1)",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1
          className="font-['Libre_Baskerville',serif] text-[28px] font-bold"
          style={{ color: "#3a3530" }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: "#7a7470" }}>
          Welcome back. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-[16px] p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-3"
                style={{ backgroundColor: stat.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p
                className="text-[28px] font-[800]"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p
                className="text-[13px] font-[700] mt-0.5"
                style={{ color: "#3a3530" }}
              >
                {stat.label}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "#7a7470" }}>
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Comments */}
      <div
        className="bg-white rounded-[16px] p-6"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-[700]" style={{ color: "#3a3530" }}>
            Recent Comments
          </h2>
          <a
            href="/admin/comments"
            className="text-[12px] font-[600]"
            style={{ color: "#5b7a5e" }}
          >
            View all →
          </a>
        </div>

        {recentComments.length === 0 ? (
          <p className="text-[13px]" style={{ color: "#7a7470" }}>
            No comments yet.
          </p>
        ) : (
          <div className="space-y-3">
            {recentComments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start gap-3 p-3.5 rounded-[12px]"
                style={{ backgroundColor: "#fdf8f2" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[12px] font-[700]"
                  style={{ backgroundColor: "#5b7a5e" }}
                >
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[13px] font-[700]"
                      style={{ color: "#3a3530" }}
                    >
                      {comment.authorName}
                    </span>
                    {comment.programSlug && (
                      <span
                        className="text-[10px] font-[600] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(91,122,94,0.1)",
                          color: "#5b7a5e",
                        }}
                      >
                        {comment.programSlug}
                      </span>
                    )}
                    <span
                      className="text-[10px] font-[600] px-2 py-0.5 rounded-full ml-auto"
                      style={{
                        backgroundColor:
                          comment.status === "approved"
                            ? "rgba(91,122,94,0.1)"
                            : comment.status === "rejected"
                            ? "rgba(220,38,38,0.08)"
                            : "rgba(196,149,106,0.1)",
                        color:
                          comment.status === "approved"
                            ? "#5b7a5e"
                            : comment.status === "rejected"
                            ? "#dc2626"
                            : "#c4956a",
                      }}
                    >
                      {comment.status}
                    </span>
                  </div>
                  <p
                    className="text-[12px] mt-0.5 truncate"
                    style={{ color: "#7a7470" }}
                  >
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
