import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import Link from "next/link";
import React, { useState } from "react";
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
      <div className="logo" />

      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Item icon={<HomeOutlined />}>
          <Link href="/">LOGO</Link>
        </Item>

        <hr className="my-2"></hr>

        <Item icon={<HomeOutlined />}>
          <Link href="/dashboard">Home</Link>
        </Item>
        <SubMenu icon={<BookOutlined />} title="Courses">
          <Item key="/courses/new">
            <Link href={"/dashboard/courses"}>List courses</Link>
          </Item>
          <Item key="/courses/new">
            <Link href="/dashboard/courses/new">New course</Link>
          </Item>
        </SubMenu>
        <SubMenu icon={<SettingOutlined />} title="Settings">
          <Item key="/profile">Profile</Item>
          <Item key="/profile/edit">Edit Profile</Item>
          <Item key="/config">Configuration</Item>
        </SubMenu>
        <Item icon={<AppstoreOutlined />}>
          {" "}
          <Link href="/"> Go Back</Link>
        </Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
