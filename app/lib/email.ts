"use server"

import { z } from "zod";
import { formSchema } from "./zodSchemas";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/contactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Gandle <${process.env.RESEND_FROM_EMAIL}>`,
      to: 'yannisboulaid@protonmail.com',
      subject: `Nouveau message, sujet: ${emailFormData.subject}`,
      react: ContactEmail({ firstName: emailFormData.firstName, email: emailFormData.email, message: emailFormData.message }),
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
