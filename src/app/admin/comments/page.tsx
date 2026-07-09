import { prisma } from "@/lib/prisma";
import { CommentActions } from "./comment-actions";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminCommentsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const activeFilter = status ?? "pending";

  const comments = await prisma.comment.findMany({
    where: activeFilter === "all" ? {} : { status: activeFilter },
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.comment.groupBy({
    by: ["status"],
    _count: true,
  });

  const countMap = Object.fromEntries(
    counts.map((c: { status: string; _count: number }) => [c.status, c._count])
  ) as Record<string, number>;
  const totalCount = Object.values(countMap).reduce((a, b) => a + b, 0);

  const tabs = [
    { label: "Pending", value: "pending", count: countMap["pending"] ?? 0 },
    { label: "Approved", value: "approved", count: countMap["approved"] ?? 0 },
    { label: "Rejected", value: "rejected", count: countMap["rejected"] ?? 0 },
    { label: "All", value: "all", count: totalCount },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1
          className="font-['Libre_Baskerville',serif] text-[28px] font-bold"
          style={{ color: "#3a3530" }}
        >
          Comments
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: "#7a7470" }}>
          Review and moderate user comments before they appear publicly.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <a
            key={tab.value}
            href={`/admin/comments?status=${tab.value}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-[600] transition-all duration-200"
            style={{
              backgroundColor:
                activeFilter === tab.value ? "#3d5a40" : "rgba(0,0,0,0.05)",
              color: activeFilter === tab.value ? "white" : "#7a7470",
            }}
          >
            {tab.label}
            <span
              className="text-[11px] px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor:
                  activeFilter === tab.value
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.08)",
                color: activeFilter === tab.value ? "white" : "#7a7470",
              }}
            >
              {tab.count}
            </span>
          </a>
        ))}
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div
          className="bg-white rounded-[16px] p-10 text-center"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
        >
          <p className="text-[14px]" style={{ color: "#7a7470" }}>
            No {activeFilter === "all" ? "" : activeFilter} comments found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-[16px] p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[14px] font-[700]"
                      style={{ color: "#3a3530" }}
                    >
                      {comment.authorName}
                    </span>
                    <span className="text-[12px]" style={{ color: "#7a7470" }}>
                      {comment.authorEmail}
                    </span>
                    {comment.programSlug && (
                      <span
                        className="text-[11px] font-[600] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(91,122,94,0.1)",
                          color: "#5b7a5e",
                        }}
                      >
                        {comment.programSlug}
                      </span>
                    )}
                    <span
                      className="text-[11px] font-[600] px-2 py-0.5 rounded-full"
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
                    <span
                      className="text-[11px] ml-auto"
                      style={{ color: "#7a7470" }}
                    >
                      {new Date(comment.createdAt ?? "").toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </span>
                  </div>
                  <p
                    className="text-[14px] leading-relaxed mt-2"
                    style={{ color: "#3a3530" }}
                  >
                    {comment.content}
                  </p>
                </div>

                <CommentActions id={comment.id} status={comment.status ?? "pending"} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
