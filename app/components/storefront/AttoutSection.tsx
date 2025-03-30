import { FadeIn } from "@/components/ui/fadeIn";
import { Truck, Gift, Leaf } from "lucide-react";


export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#BFA48C] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          <FadeIn delay={0}>
            <div className="bg-[#fffaf5] border border-[#BFA48C]/40 rounded-xl shadow-sm p-8 h-full flex flex-col items-center text-center transition hover:shadow-md">
              <Truck className="w-10 h-10 text-[#BFA48C]" />
              <div className="w-8 h-[2px] bg-[#BFA48C] my-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Livraison en 48 à 72h
              </h3>
              <p className="text-sm text-gray-700 min-h-[3.5rem]">
                Livraison Colissimo rapide et suivie directement chez vous.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-[#fffaf5] border border-[#BFA48C]/40 rounded-xl shadow-sm p-8 h-full flex flex-col items-center text-center transition hover:shadow-md">
              <Gift className="w-10 h-10 text-[#BFA48C]" />
              <div className="w-8 h-[2px] bg-[#BFA48C] my-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Frais de port offerts
              </h3>
              <p className="text-sm text-gray-700 min-h-[3.5rem]">
                Dès 80 € d’achat, la livraison est offerte.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#fffaf5] border border-[#BFA48C]/40 rounded-xl shadow-sm p-8 h-full flex flex-col items-center text-center transition hover:shadow-md">
              <Leaf className="w-10 h-10 text-[#BFA48C]" />
              <div className="w-8 h-[2px] bg-[#BFA48C] my-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Engagement écologique
              </h3>
              <p className="text-sm text-gray-700 min-h-[3.5rem]">
                Tous nos contenants sont réutilisables ou recyclables.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
