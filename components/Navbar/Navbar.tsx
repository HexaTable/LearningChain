import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  WindowsOutlined,
} from '@ant-design/icons';


import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

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

function Navbar() {
  
  const router = useRouter();
  const { data: session, status }  = useSession();
  
  const handleExploreClick = () => {
    router.push('/explore');
  };
  
  const handleLoginClick = () => {
    signIn();
  };
  
  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const leftItems :MenuItem[] = [

    getItem('Explore', '1', <WindowsOutlined onClick={handleExploreClick} />),

  ]

  const rightItems :MenuItem[] = [

    session ? getItem('Dashboard', '2', <UserOutlined onClick={handleDashboardClick} />)
            : getItem(
        'Login', 
        '2', 
        <>
          <UserOutlined onClick={handleLoginClick} />
          <span style={{ cursor: 'pointer' }} onClick={handleLoginClick}>Login</span>
        </>
      ),

  ]

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', overflow: 'auto' }}>
        <Menu theme="dark" mode="horizontal" items={leftItems} style={{ width: '50%' }} />
        <Menu
          theme="dark"
          mode="horizontal"
          items={rightItems}
          style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}
        />
      </div>
      <style jsx>{`
        @media only screen and (max-width: 768px) {
          .ant-menu-horizontal {
            display: none;
          }
          .ant-menu-vertical {
            display: flex;
            justify-content: space-between;
          }
        }
      `}</style>
    </Header >
  )
}

export default Navbar;