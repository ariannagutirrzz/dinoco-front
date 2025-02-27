import { useState } from "react";
import {
  Icon2fa,
  IconFileAnalytics,
  IconFingerprint,
  IconCreditCardPay,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconUserPlus,
  IconReceiptRefund,
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
  IconBuildingStore,
  IconCarGarage,
  IconCheckupList,
  IconUserDollar,
  IconGraph
} from "@tabler/icons-react";
import { SegmentedControl, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./NavbarSegmented.module.css";

const tabs = {
  account: [
    { link: "/products", label: "Products", icon: IconBuildingStore },
    { link: "/users", label: "Users", icon: IconUsers },
    { link: "/clients", label: "Clients", icon: IconUserPlus },
    { link: "/providers", label: "Providers", icon: IconCheckupList },
    { link: "/deposits", label: "Deposits", icon: IconCarGarage },
    { link: "/purchases", label: "Purchases", icon: IconCreditCardPay },
    { link: "/sales", label: "Sales", icon: IconUserDollar },
  ],
  general: [
    { link: "/charts", label: "Charts", icon: IconGraph },
    { link: "", label: "Receipts", icon: IconLicense },
    // { link: "", label: "Reviews", icon: IconMessage2 },
    // { link: "", label: "Messages", icon: IconMessages },
    { link: "", label: "Refunds", icon: IconReceiptRefund },
    // { link: "", label: "Files", icon: IconFileAnalytics },
    { link: "", label: "Security", icon: IconFingerprint },
    // { link: "", label: "2Fa", icon: Icon2fa },
    { link: "", label: "Other Settings", icon: IconSettings },
  ],
};

export function NavbarSegmented() {
  const [section, setSection] = useState("account");
  const [active, setActive] = useState("Billing");

  const links = tabs[section].map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
          Jose Oropeza
        </Text>

        <SegmentedControl
          value={section}
          onChange={(value) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Account", value: "account" },
            { label: "System", value: "general" },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
