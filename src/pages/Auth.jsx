import { useState } from "react";
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Tabs,
  Text,
  Group,
  Loader,
  Title,
  Stack,
  Image
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import auth from "../api/auth.js";

export default function AuthTest() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (activeTab === "login") {
        const response = await auth.login(email, password);
        if (response?.token) {
          localStorage.setItem("token", response.token);
          setMessage("✅ Login successful! Redirecting...");
          setTimeout(() => (window.location.href = "/"), 1000);
        } else {
          setMessage("❌ Login failed. Please check your credentials.");
        }
      } else {
        const response = await auth.signup(email, password);
        if (response?.message) {
          setMessage("✅ Signup successful! Please log in.");
          setTimeout(() => setActiveTab("login"), 1000);
        } else {
          setMessage("❌ Signup failed. Try again.");
        }
      }
    } catch (error) {
      setMessage("❌ An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack align="center" justify="center" className="min-h-screen">
      <Image src="src\assets\Cloud-9.webp" w="12vh"></Image>
      <Title order={2} align="center" className="mb-6">
         Choose an option to start
      </Title>
      <Card
        shadow="md"
        p="lg"
        radius="md"
        withBorder
        className="w-[360px] bg-white"
      >
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="pills"
          className="mb-4"
        >
          <Tabs.List grow>
            <Tabs.Tab value="login">Login</Tabs.Tab>
            <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<IconAt size={16} />}
            required
            className="mb-3"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<IconLock size={16} />}
            required
            className="mb-4"
          />

          <Group position="apart">
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? (
                <Loader size="sm" />
              ) : activeTab === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </Group>
        </form>

        {message && (
          <Text
            color={message.startsWith("✅") ? "green" : "red"}
            size="sm"
            mt="md"
            align="center"
          >
            {message}
          </Text>
        )}
      </Card>
    </Stack>
  );
}
