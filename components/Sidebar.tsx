import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SettingOutlined, BookOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">

        <Link href="/" className="cursor-pointer">
          {collapsed ? (
            <Image
              src="/small-logo.svg"
              alt="LearningChain Logo"
              width={50}
              height={50}
              className="cursor-pointer ml-2"
            />
          ) : (
            <Image
              src="/logo.svg"
              alt="LearningChain Logo"
              width={190}
              height={50}
              className="cursor-pointer ml-2"
            />
          )}
        </Link>

        <hr className="my-2" />

        <SubMenu icon={<BookOutlined />} title="Courses">
          <Item key="/courses">
            <Link href={"/dashboard/courses"}>List courses</Link>
          </Item>
          <Item key="/courses/new">
            <Link href="/dashboard/courses/new">New course</Link>
          </Item>
          <Item key="/courses/mine">
            <Link href="/dashboard/courses/mine">My courses</Link>
          </Item>
        </SubMenu>

        <SubMenu icon={<SettingOutlined />} title="Settings">
          <Item key="/profile">
            <Link href="/dashboard/profile">Profile</Link>
          </Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
