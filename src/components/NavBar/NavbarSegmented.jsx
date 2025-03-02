import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
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
  IconGraph,
} from "@tabler/icons-react";
import { SegmentedControl, Text } from "@mantine/core";
import classes from "./NavbarSegmented.module.css";

const tabs = {
  account: [
    { link: "/charts", label: "Charts", icon: IconGraph },
    { link: "/products", label: "Products", icon: IconBuildingStore },
    { link: "/clients", label: "Clients", icon: IconUserPlus },
    { link: "/providers", label: "Providers", icon: IconCheckupList },
    { link: "/deposits", label: "Deposits", icon: IconCarGarage },
    { link: "/purchases", label: "Purchases", icon: IconCreditCardPay },
    { link: "/sales", label: "Sales", icon: IconUserDollar },
  ],
  general: [
    { link: "", label: "Receipts", icon: IconLicense },
    { link: "", label: "Refunds", icon: IconReceiptRefund },
    { link: "", label: "Security", icon: IconFingerprint },
    { link: "", label: "Other Settings", icon: IconSettings },
    { link: "/users", label: "Users", icon: IconUsers },
  ],
};

export function NavbarSegmented() {
  const [section, setSection] = useState("account");
  const [active, setActive] = useState("Billing");
  const navigate = useNavigate();

  const links = tabs[section].map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <nav className={classes.navbar}>
      <div>
        {/* ✅ "A2" Now Redirects to Home */}
        <Link to="/" className={classes.title}>
          <Text fw={500} size="sm" c="dimmed" mb="xs">
            A2
          </Text>
        </Link>

        <SegmentedControl
          value={section}
          onChange={setSection}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "System", value: "account" },
            { label: "Account", value: "general" },
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
          onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
