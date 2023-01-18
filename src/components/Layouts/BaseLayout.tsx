import { FC, ReactNode } from 'react';
import { Layout, theme } from 'antd';
import LayoutHeader from './Header';
import Footer from './Footer';

const { Content } = Layout;

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }: BaseLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <LayoutHeader />
      <Content className="site-layout" style={{ padding: '0 50px 50px 50px', minHeight: '85vh', maxWidth: '1024px' }}>
        <div style={{ padding: 24, minHeight: '85vh', minWidth: '45vw', background: colorBgContainer }}>{children}</div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default BaseLayout;
