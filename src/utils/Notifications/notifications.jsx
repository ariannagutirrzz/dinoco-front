import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export function notify(type, title, message) {
      showNotification({
        title: title,
        message: message,
        color: type === "success" ? "green" : "red",
        icon: type === "success" ? <IconCheck /> : <IconX />,
        autoClose: 3000,
      });
  }
  
