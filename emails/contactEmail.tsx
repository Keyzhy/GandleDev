import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Button,
} from "@react-email/components";
import * as React from "react";

interface ContactTemplateProps {
  firstName: string;
  email: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactTemplateProps>> = ({
  firstName,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={title}>
          📬 Nouveau message depuis le formulaire de contact
        </Heading>

        <Section>
          <Text style={label}>📧 Email :</Text>
          <Text style={value}>{email}</Text>

          <Text style={label}>👤 Nom :</Text>
          <Text style={value}>{firstName}</Text>

          <Text style={label}>✉️ Message :</Text>
          <Text style={value}>{message}</Text>
        </Section>

        <Section style={{ textAlign: "center", marginTop: 30 }}>
          <Button
            href={`mailto:${email}?subject=Réponse à votre message&body=${encodeURIComponent(
              `Bonjour ${firstName},\n\nMerci pour votre message !\n\nVoici votre message original :\n"${message}"\n\n\nCordialement,\nL'équipe Gandle\n\n`
            )}`}
            style={button}
          >
            Répondre
          </Button>
        </Section>

        <Hr style={hr} />
        <Text style={footer}>
          Ce message a été généré automatiquement depuis le site. Veuillez ne
          pas répondre directement à cet email.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
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

const title = {
  fontSize: "22px",
  marginBottom: "20px",
  color: "#333333",
};

const label = {
  fontWeight: "bold" as const,
  marginTop: "12px",
  marginBottom: "4px",
  color: "#444",
};

const value = {
  margin: 0,
  color: "#555",
  fontSize: "15px",
  lineHeight: "1.6",
};

const button = {
  backgroundColor: "#BFA48C",
  color: "#fff",
  padding: "12px 20px",
  fontSize: "14px",
  borderRadius: "6px",
  textDecoration: "none",
};

const hr = {
  margin: "32px 0",
  border: "none",
  borderTop: "1px solid #eee",
};

const footer = {
  fontSize: "12px",
  color: "#999999",
  textAlign: "center" as const,
};
