export const runtime = "nodejs";

export async function POST() {
  return Response.json({
    error: "Human Twin generation is not connected to a validated server-side data pipeline yet.",
    code: "HUMAN_TWIN_GENERATION_NOT_CONFIGURED",
  }, { status: 501 });
}
