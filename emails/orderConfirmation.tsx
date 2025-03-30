import { Html, Head, Body, Container, Heading, Text, Section, Row, Column, Button } from "@react-email/components";

interface OrderConfirmationEmailProps {
  name?: string;
  orderNumber?: string;
  totalAmount?: number;
  lineItems?: { id: string; description: string; quantity: number; price: number }[];
}

export default function OrderConfirmationEmail({
  name = "Cher client",
  orderNumber = "Inconnu",
  totalAmount = 0,
  lineItems = [],
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f5f5f5", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", maxWidth: "600px", margin: "auto" }}>
          
          {/* Titre */}
          <Heading style={{ color: "#333", textAlign: "center" }}>Merci pour votre commande, {name} !</Heading>
          <Text style={{ textAlign: "center", color: "#555" }}>
            Votre commande <strong>#{orderNumber}</strong> a bien été enregistrée. 📦
          </Text>

          <Section>
            <Heading as="h2" style={{ fontSize: "18px", color: "#444", borderBottom: "2px solid #eee", paddingBottom: "8px" }}>Détails de la commande</Heading>

            {/* Tableau des articles */}
            <Row style={{ backgroundColor: "#f8f8f8", padding: "10px", borderRadius: "5px", fontWeight: "bold", color: "#333" }}>
              <Column style={{ width: "50%" }}>Produit</Column>
              <Column style={{ width: "20%", textAlign: "center" }}>Quantité</Column>
              <Column style={{ width: "30%", textAlign: "right" }}>Prix</Column>
            </Row>

            {lineItems.map((item, index) => (
              <Row key={item.id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                <Column style={{ width: "50%" }}>{item.description}</Column>
                <Column style={{ width: "20%", textAlign: "center" }}>{item.quantity}</Column>
                <Column style={{ width: "30%", textAlign: "right" }}>{(item.price / 100).toFixed(2)} €</Column>
              </Row>
            ))}

            {/* Total */}
            <Row style={{ marginTop: "15px", fontSize: "16px", fontWeight: "bold", color: "#222" }}>
              <Column style={{ width: "70%" }}>Total :</Column>
              <Column style={{ width: "30%", textAlign: "right" }}>{(totalAmount / 100).toFixed(2)} €</Column>
            </Row>
          </Section>

          {/* Message de suivi */}
          <Text style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
            Nous vous informerons dès l'expédition de votre commande.  
          </Text>

          {/* Bouton Suivi de commande */}
          <Section style={{ textAlign: "center", marginTop: "20px" }}>
            <Button href="https://gandle-dev.vercel.app/orders" style={{ backgroundColor: "#BFA48C", color: "#ffffff", padding: "10px 20px", borderRadius: "5px", textDecoration: "none", fontSize: "16px" }}>
              Suivre ma commande
            </Button>
          </Section>

          {/* Footer */}
          <Text style={{ marginTop: "30px", textAlign: "center", fontSize: "12px", color: "#888" }}>
            © {new Date().getFullYear()} Gandle - Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
