import { Html, Head, Body, Container, Heading, Text, Section, Row, Column } from "@react-email/components";

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
      <Body style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
        <Container style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
          <Heading>Merci pour votre commande, {name} !</Heading>
          <Text>Votre commande <strong>#{orderNumber}</strong> a bien été enregistrée.</Text>

          <Section>
          <Heading as="h2">Détails de la commande</Heading>


            {/* En-têtes */}
            <Row>
              <Column style={{ width: "50%" }}><Text><strong>Produit</strong></Text></Column>
              <Column style={{ width: "20%" }}><Text><strong>Quantité</strong></Text></Column>
              <Column style={{ width: "30%" }}><Text><strong>Prix</strong></Text></Column>
            </Row>

            {/* Liste des articles */}
            {lineItems.map(item => (
              <Row key={item.id} style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}>
                <Column style={{ width: "50%" }}><Text>{item.description}</Text></Column>
                <Column style={{ width: "20%" }}><Text>{item.quantity}</Text></Column>
                <Column style={{ width: "30%" }}><Text>{item.price.toFixed(2)} €</Text></Column>
              </Row>
            ))}
          </Section>

          <Text><strong>Total :</strong> {totalAmount.toFixed(2)} €</Text>

          <Section>
            <Text>Nous vous informerons dès son expédition.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
