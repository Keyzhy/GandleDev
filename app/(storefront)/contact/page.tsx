"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import bougie from "@/public/bougie.jpg";
import { formSchema } from "@/app/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { send } from "@/app/lib/email";
import { toast } from "sonner";
import { FadeIn } from "@/components/ui/fadeIn";
 // adapte le chemin si besoin

export default function ContactRoute() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      subject: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    send(values);
    form.reset();
    toast("Merci pour votre message !", {
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
  }

  return (
    <div className="flex items-center justify-center sm:p-5 md:p-7 md:mt-32">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
        
        {/* Colonne gauche : texte + image */}
        <FadeIn className="w-full md:w-1/2">
          <div className="flex flex-col space-y-6 justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Contactez-nous
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Une question, une remarque ou un besoin spécifique ? Remplissez le
              formulaire, notre équipe vous répondra dans les plus brefs délais.
            </p>
            <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md">
              <Image
                src={bougie}
                alt="Bougie artisanale"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </FadeIn>

        {/* Colonne droite : formulaire */}
        <FadeIn className="w-full md:w-1/2">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl text-[#BFA48C] font-semibold">
                Formulaire de contact
              </CardTitle>
              <CardDescription className="text-gray-600">
                N&apos;hésitez pas à nous écrire, nous sommes à votre écoute.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-4 sm:space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="exemple@exemple.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Objet de votre message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Votre message ici..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full text-sm sm:text-base py-2 sm:py-3"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
