import { Title, Text, Button, Stack } from "@mantine/core";

export default function Products() {
    return (
        <>
        <Stack align="center">
            <Title order={1}>Products</Title>
            <Text>Welcome to the Products page. </Text>
            <Text>This is an Inventory System.</Text>
            <Button>Click me</Button>
        </Stack>
        </>
    );
    }