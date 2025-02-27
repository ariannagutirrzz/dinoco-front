import { Title, Text, Button, Stack } from "@mantine/core";
import { notify } from "../utils/Notifications/Notifications";
import { BarChartThinHorizontal } from '../components/Charts/BarChartThinHorizontal';

export default function Home() {

  function message() {
    notify( "success", "Hello", "This is a message" );
  }

  return (
    <>
      <Stack align="center">
        <Title order={1}>Home</Title>
        <Text>Welcome to the Home page. </Text>
        <Text>This is an Inventory System.</Text>
        <Button onClick={message}>Click me</Button>
        <BarChartThinHorizontal />
      </Stack>
    </>
  );
}
