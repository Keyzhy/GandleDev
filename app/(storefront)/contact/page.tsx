"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import bougie from "@/public/bougie.jpg";
import { formSchema } from "@/app/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { send } from "@/app/lib/email";
import { toast } from "sonner";

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
    console.log(values);

    // Vider les champs du formulaire
    form.reset();

    // Afficher une alerte
    toast("Merci pour votre message!",{
      description: " Nous vous repondrons dans les plus brefs délais."
    }
    );
  }

  return (
    <div className=" flex items-center justify-center sm:p-5 md:p-7  md:mt-32">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col  space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contactez nous
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Si vous avez des questions ou des commentaires, n&apos;hésitez pas à
            nous contacter en utilisant le formulaire.
          </p>
          <div className=" w-full aspect-video">
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
            <CardTitle className="text-2xl sm:text-3xl">
              Formulaire de contact
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Remplissez ce formulaire pour nous envoyer un message. Nous vous
              répondrons dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                  <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom ici..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="exemple@exemple.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Quel est l'intitulé de votre demande ?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Renseigneé votre message ici ! " {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full text-sm sm:text-base py-2 sm:py-3">
              Envoyer le message
            </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
