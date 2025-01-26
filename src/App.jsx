import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <MantineProvider withGlobalClasses withNormalizeCss>
        <AppRoutes />
      </MantineProvider>
    </>
  );
}

export default App;
