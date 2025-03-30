"use server";

import { z } from "zod";
import { formSchema } from "./zodSchemas";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/contactEmail";
import { ContactConfirmationEmail } from "@/emails/confirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    // 1. Email interne à toi
    const { data: internalData, error: internalError } = await resend.emails.send({
      from: `Gandle <contact@gandle.fr>`,
      to: "yannisboulaid@protonmail.com",
      subject: `Nouveau message, sujet: ${emailFormData.subject}`,
      react: ContactEmail({
        firstName: emailFormData.firstName,
        email: emailFormData.email,
        message: emailFormData.message,
      }),
    });

    if (internalError) throw internalError;

    // 2. Email automatique de confirmation au client
    const { error: confirmationError } = await resend.emails.send({
      from: `Gandle <${process.env.RESEND_FROM_EMAIL}>`,
      to: emailFormData.email,
      subject: "Votre message a bien été reçu",
      react: ContactConfirmationEmail({
        firstName: emailFormData.firstName,
      }),
    });

    if (confirmationError) throw confirmationError;

  } catch (e) {
    throw e;
  }
};
