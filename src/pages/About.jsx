import { Card, Text, Title, Container } from "@mantine/core";

export default function About() {
  return (
    <Container size="sm" mt={50}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} mb="md">
          About This System
        </Title>
        <Text size="md" mb="sm">
          This inventory and sales system is designed to help businesses efficiently manage their products, sales, clients, and providers. With real-time tracking, user management, and insightful analytics, it provides a seamless experience for handling transactions and stock levels.
        </Text>
        <Text size="md" weight={500} mt="md">
          Developed by: NubeDev Team
        </Text>
      </Card>
    </Container>
  );
}
