// Styles for the application
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// Routes for the application
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <MantineProvider withGlobalClasses withNormalizeCss>
        <Notifications position="top-right"/>
        <AppRoutes />
      </MantineProvider>
    </>
  );
}

export default App;
