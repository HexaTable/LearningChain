import { useState } from "react";
import { useRouter } from "next/router";
import {
  DesktopOutlined,
  HomeOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";

const { SubMenu, Item } = Menu;
const { Header } = Layout;

function Navbar() {
  const { data: session } = useSession();
  const [current, setCurrent] = useState("/");
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
      <Menu />
      <Menu
        defaultSelectedKeys={["1"]}
        theme="dark"
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
      >
        <Item key="/" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Item>

        <Item key="/explore" icon={<PieChartOutlined />}>
          <Link href="/explore">Explore</Link>
        </Item>

        {session ? (
          <SubMenu
            className="float-left"
            icon={<UserOutlined />}
            title={session.user.name}
          >
            <Item key="/dashboard" icon={<DesktopOutlined />}>
              <Link href="/dashboard">Dashboard</Link>
            </Item>
            <Item icon={<UserOutlined />}>
              <Link href="/api/auth/logout">Log Out</Link>
            </Item>
          </SubMenu>
        ) : (
          <Item icon={<UserOutlined />}>
            <Link href="/api/auth/signin">LogIn</Link>
          </Item>
        )}
      </Menu>
    </Header>
  );
}

export default Navbar;
