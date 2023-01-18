import { FC } from 'react';

import { Layout, Divider } from 'antd';
import { Breadcrumb } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const UsersLayout: FC = () => {
  const location = useLocation();

  const route = location.pathname
    .split('/')
    .filter(snippet => snippet)
    .slice(1);
  const url = route.join('/');
  const routeName = route.join(' ');

  const breadcrumbItems = [
    <Breadcrumb.Item key="users">
      <Link to="/">Users</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key={url}>
      <Link to={url}>{routeName}</Link>
    </Breadcrumb.Item>,
  ];

  return (
    <Layout style={{ background: 'white' }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      <Divider />
      <Outlet />
    </Layout>
  );
};

export default UsersLayout;
