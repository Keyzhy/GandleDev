import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



async function getData(){
    const data = await prisma.order.findMany({
        select:{
            amount: true,
            id:true,
            User:{
                select:{
                    firstname: true,
                    profileImage: true,
                    email: true,
                },
            },
        },
        orderBy:{
            createdAt: "desc",
        },
        take: 7,
    });

    return data;
}


export async function RecentSales(){

    const data = await getData()

    return(
        <Card>
        <CardHeader>
            <CardTitle> Dernières ventes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
            {data.map((item) =>(
                <div className="flex items-center gap-2" key={item.id}>
                <Avatar className="hidden sm:flex h-9 w-9">
                    <AvatarImage src={item.User?.profileImage} alt="Avatar Image"/>
                    <AvatarFallback>{item.User?.firstname.slice(0,3)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium">{item.User?.firstname}</p>
                    <p className="text-sm text-muted-foreground">{item.User?.email}</p>
                </div>
                <p className="ml-auto font-medium">+{new Intl.NumberFormat('en-GB').format(item.amount/100)} €</p>
            </div>
            ))}
        </CardContent>

    </Card>
    )
}