import Image from "next/image";
import Link from "next/link";
import bougie from '@/public/bougie.jpg'
import fondant from'@/public/fondant.webp'
import diffuseur from'@/public/diffuseur.jpg'

export function CategoriesSelection(){
    return(
        <div className="py-16 sm:py-20">
            <div  className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold tracking-tight">Nos catégories de produits</h2>

                <Link className="text-sm font-semibold text-primary hover:text-primary/80" href="/products/all" >
                    Tous les produits &rarr;
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
                    <Image 
                        src={bougie} 
                        alt="Bougie" 
                        className="object-cover object-center"  
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55"/>
                    <div className="p-6 flex items-end">
                        <Link href="/products/bougies">
                            <h3 className="text-white font-semibold">Bougies</h3>
                            <p className="mt-1 text-sm text-white">test test</p>
                        </Link>
                    </div>
                </div>

                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                    <Image 
                        src={fondant} 
                        alt="Fondants" 
                        className="oject-center object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"  
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0"/>
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/fondants">
                            <h3 className="text-white font-semibold">Fondants</h3>
                            <p className="mt-1 text-sm text-white">test test</p>
                        </Link>
                    </div>
                </div>

                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                    <Image 
                        src={diffuseur} 
                        alt="Désodorisants" 
                        className="oject-center object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"  
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0"/>
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/diffuseurs">
                            <h3 className="text-white font-semibold">Diffuseurs pour voiture</h3>
                            <p className="mt-1 text-sm text-white">test test</p>
                        </Link>
                    </div>
                </div>
            


            </div>

        </div>
    )
}