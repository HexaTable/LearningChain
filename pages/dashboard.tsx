import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  BookOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;


const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Item icon={<HomeOutlined />}><Link href="/dashboard">Home</Link></Item>
            <SubMenu icon={<BookOutlined />} title="Courses">
              <Item key="/courses">List Courses</Item>
              <Item key="/courses/new">Create Course</Item>
            </SubMenu>
            <SubMenu icon={<SettingOutlined />} title="Settings">
              <Item key="/profile">Profile</Item>
              <Item key="/profile/edit">Edit Profile</Item>
              <Item key="/config">Configuration</Item>
            </SubMenu>
            <Item icon={<AppstoreOutlined />}> <Link href="/"> Go Back</Link></Item>
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  );
};


export default Dashboard;
