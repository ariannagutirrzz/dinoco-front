import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export function notify(type, title, message) {
      showNotification({
        title,
        message,
        color: type === "success" ? "green" : "red",
        icon: type === "success" ? <IconCheck /> : <IconX />,
        autoClose: 3000,
      });
  }
  
