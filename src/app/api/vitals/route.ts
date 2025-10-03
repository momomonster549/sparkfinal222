export async function POST(req: Request) {
  try {
    const metric = await req.json();
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
