import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';



const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items2: MenuItem[] = [
  getItem('Home', '1', <PieChartOutlined />),
  getItem('Courses', '2', <DesktopOutlined />, [
    getItem('In Progress', '3'),
    getItem('Finished', '4'),
    getItem('Created', '5'),
  ]),
  getItem('Settings', 'sub1', <UserOutlined />, [
    getItem('Profile', '3'),
    getItem('Account', '4'),
    getItem('Configuratin', '5'),
  ]),
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items2} />
        </Sider>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};


export default Dashboard;
