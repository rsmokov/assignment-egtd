import { FC } from 'react';
import { UserOutlined, UnorderedListOutlined, BookOutlined } from '@ant-design/icons';
import { MenuProps, Menu, Layout, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    label: <span style={{ color: 'white' }}>EGT Digital Assignment</span>,
    key: 'home',
    disabled: true,
    icon: <BookOutlined style={{ color: 'white' }} />,
  },
  {
    label: <Link to="/">Users</Link>,
    key: 'users',
    icon: <UserOutlined style={{ fontSize: '1em' }} />,
  },
  {
    label: <Link to="/tasks">Tasks</Link>,
    key: 'tasks',
    icon: <UnorderedListOutlined style={{ fontSize: '1em' }} />,
  },
];

const LayoutHeader: FC = () => {
  const location = useLocation();
  const selectedKeys = location.pathname
    .split('/')
    .splice(1)
    .map(key => key.toLocaleLowerCase());
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: colorPrimary }}>
      <Menu
        defaultSelectedKeys={selectedKeys}
        mode="horizontal"
        style={{ color: 'white', background: 'transparent' }}
        items={items}
      />
    </Header>
  );
};

export default LayoutHeader;
