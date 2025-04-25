import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  // 🔒 Ne pas mettre en cache cette requête
  noStore();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    console.error("❌ Utilisateur introuvable dans la session.");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 🔍 Vérifier si l'utilisateur existe déjà
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    // 📝 Sinon, on le crée
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstname: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }

    // ✅ Redirection vers la homepage (local ou prod)
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://gandle-dev.vercel.app/";

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'enregistrement de l'utilisateur :",
      error
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
