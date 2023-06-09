import { useState } from "react";
import { useRouter } from "next/router";
import {
  DesktopOutlined,
  HomeOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const { SubMenu, Item } = Menu;
const { Header } = Layout;

function Navbar() {
  const { data: session } = useSession();

  const current_path = useRouter().pathname;
  const [current] = useState(current_path);

  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Header>
      <Menu
        defaultSelectedKeys={["1"]}
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        className="flex"
      >
        <div className="justify-start mr-auto">
          <Item key="/" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Item>

          <Item key="/explore" icon={<PieChartOutlined />}>
            <Link href="/explore">Explore</Link>
          </Item>
        </div>
        <div className="justify-end ml-auto">
          {session ? (
            <SubMenu
              className="float-left"
              icon={<UserOutlined />}
              title={session.user.name}
            >
              <Item key="/dashboard" icon={<DesktopOutlined />}>
                <Link href="/dashboard/courses">Dashboard</Link>
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
              <Link href="/api/auth/signin">Login</Link>
            </Item>
          )}
        </div>
      </Menu>
    </Header>
  );
}

export default Navbar;
