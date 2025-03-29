export async function POST(req: Request) {
    console.log("Route test appelée !");
    return new Response("OK", { status: 200 });
}