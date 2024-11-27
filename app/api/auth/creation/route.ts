import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import {unstable_noStore as noStore} from "next/cache";

export async function GET() {
    noStore();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user === null || !user.id){
        throw new Error('Sometin went wrong...');
    }


    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if(!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstname: user.given_name ?? '',
                lastName: user.family_name ?? '',
                email: user.email ?? '',
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
            },
        });
    }

    return NextResponse.redirect('process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://gandle-dev-o7d7-q9k8kzk79-yannis-projects-8f2db8f0.vercel.app/"');
}