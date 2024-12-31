import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import bougie from '@/public/bougie.jpg'

export default function ContactRoute() {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-5 md:p-7">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col  space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contactez nous</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Si vous avez des questions ou des commentaires, n&apos;hésitez pas à nous contacter en utilisant le formulaire.
          </p>
          <div className="relative w-full aspect-video">
            <Image
              src={bougie}
              alt="Bougie"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Formulaire de contact</CardTitle>
            <CardDescription className="text-sm sm:text-base">Remplissez ce formulaire pour nous envoyer un message. Nous vous répondrons dans les plus brefs délais.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm sm:text-base">Nom</Label>
                  <Input id="name" placeholder="Jean Michel" className="text-sm sm:text-base p-2 sm:p-3" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                  <Input id="email" placeholder="jean@exemple.com" type="email" className="text-sm sm:text-base p-2 sm:p-3" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject" className="text-sm sm:text-base">Sujet</Label>
                <Input id="subject" placeholder="Quel est l'intitulé de votre demande ?" className="text-sm sm:text-base p-2 sm:p-3" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                <Textarea id="message" placeholder="Rensseignez votre message ici !" className="text-sm sm:text-base p-2 sm:p-3 min-h-[100px]" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-sm sm:text-base py-2 sm:py-3">Envoyer le message</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

