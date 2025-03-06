import { Title, Text, Stack, Image, Group } from "@mantine/core";

export default function Home() {

  return (
    <>
      <Stack align="center" justify="center" h="90vh">
        <Group>
        <Title order={1}>Home</Title>
        <Image src="src\assets\Cloud-9.webp" w="8vh"></Image>
        </Group>

        <Text>Select an option to start working.</Text>
      </Stack>
    </>
  );
}
