import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    const { results } = await db
      .prepare(
        "SELECT id, email, name, created_at, ip, user_agent FROM registrations ORDER BY created_at DESC"
      )
      .all();

    const rows = results ?? [];

    // Build CSV
    const header = "id,email,name,created_at,ip,user_agent";
    const csvRows = rows.map((row: Record<string, unknown>) => {
      const fields = [
        row.id,
        escapeCsv(String(row.email ?? "")),
        escapeCsv(String(row.name ?? "")),
        row.created_at,
        escapeCsv(String(row.ip ?? "")),
        escapeCsv(String(row.user_agent ?? "")),
      ];
      return fields.join(",");
    });

    const csv = [header, ...csvRows].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return Response.json(
      { error: "Failed to export registrations." },
      { status: 500 }
    );
  }
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
