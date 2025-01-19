import { Truck, Gift, Leaf } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section className="w-full mx-auto rounded-xl bg-[#BFA48C] py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Delivery Feature */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Truck className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">
              Livraison en 48 à 72h
            </h2>
            <p className="text-gray-600">
              Livraison colissimo garantie en 72h chez vous
            </p>
          </div>

          {/* Free Shipping Feature */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Gift className="w-12 h-12 " />
            </div>
            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">
              Frais de port offert
            </h2>
            <p className="text-gray-600">
              À partir de 80 € d'achat la livraison est OFFERTE
            </p>
          </div>

          {/* Eco-Friendly Feature */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Leaf className="w-12 h-12 " />
            </div>
            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">
              Écologique 
            </h2>
            <p className="text-gray-600">
              Fini le gaspillage de récipient, recyclez le !
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

