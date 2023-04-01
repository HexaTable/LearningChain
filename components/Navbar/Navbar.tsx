import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Header } = Layout;


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

const items1: MenuItem[] = [
  getItem('Explore', '1', <PieChartOutlined />),
  getItem('Subscribed', '2', <DesktopOutlined />,),
  getItem('Dashboard', '3', <DesktopOutlined />,)
];

function Navbar() {
  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items1}
      />
    </Header >
  )
}

export default Navbar;