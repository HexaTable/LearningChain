import { useState } from "react";
import { useRouter } from "next/router";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

const { Header } = Layout;

function getItem(
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  getItem("/explore", "Explore", <PieChartOutlined />),
  getItem("/dashboard", "Dashboard", <DesktopOutlined />),
];

function Navbar() {
  const [current, setCurrent] = useState("/");
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
      />
    </Header>
  );
}

export default Navbar;
