import { Html, Head, Body, Container, Text, Heading } from "@react-email/components";

interface ShippingConfirmationEmailProps {
  name: string;
  orderNumber: string;
}

export default function ShippingConfirmationEmail({ name, orderNumber }: ShippingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <Heading>Votre commande est en route !</Heading>
          <Text>Bonjour {name},</Text>
          <Text>
            Bonne nouvelle ! Votre commande <strong>#{orderNumber}</strong> a été transmise au transporteur.
          </Text>
          <Text>Elle sera expédiée dans les plus brefs délais.</Text>
          <Text>Merci pour votre confiance ❤️</Text>
        </Container>
      </Body>
    </Html>
  );
}
