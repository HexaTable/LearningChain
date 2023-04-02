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
import { useSession, signOut } from "next-auth/react";

const { SubMenu, Item } = Menu;
const { Header } = Layout;

function Navbar() {
  const { data: session } = useSession();

  const current_path = useRouter().pathname;
  const [current, setCurrent] = useState(current_path);

  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  const logout = async () => {
    await signOut();
    router.push("/");
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
            <Item
              key="/api/auth/signout"
              onClick={logout}
              icon={<UserOutlined />}
            >
              Log out
            </Item>
          </SubMenu>
        ) : (
          <Item key="/api/auth/signin" icon={<UserOutlined />}>
            Login
          </Item>
        )}
      </Menu>
    </Header>
  );
}

export default Navbar;
