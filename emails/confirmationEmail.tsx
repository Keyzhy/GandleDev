// src/emails/ContactConfirmationEmail.tsx
import {
    Html,
    Head,
    Body,
    Container,
    Heading,
    Text,
    Hr,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ContactConfirmationEmailProps {
    firstName: string;
  }
  
  export const ContactConfirmationEmail: React.FC<ContactConfirmationEmailProps> = ({ firstName }) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🤝 Merci pour votre message, {firstName} !</Heading>
          <Text style={text}>
            Nous avons bien reçu votre demande de contact. Un membre de notre équipe vous répondra dans les plus brefs délais.
          </Text>
          <Text style={text}>
            Si vous avez d'autres questions, n'hésitez pas à répondre à cet email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>L'équipe Gandle</Text>
        </Container>
      </Body>
    </Html>
  );
  
  const main = {
    backgroundColor: "#f4f4f4",
    padding: "40px 0",
    fontFamily: "Helvetica, Arial, sans-serif",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    maxWidth: "600px",
    margin: "0 auto",
  };
  
  const heading = {
    fontSize: "22px",
    color: "#333",
    marginBottom: "16px",
  };
  
  const text = {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.6",
  };
  
  const hr = {
    margin: "24px 0",
    border: "none",
    borderTop: "1px solid #eee",
  };
  
  const footer = {
    fontSize: "13px",
    color: "#888",
    textAlign: "center" as const,
  };
  