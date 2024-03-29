import { ReactElement } from 'react';
import { Layout, Row, Col, Image } from 'antd';
import reactLogo from '@/assets/react.js-logo.svg';
import antdLogo from '@/assets/antd-logo.svg';

const Footer = (): ReactElement => {
  return (
    <Layout.Footer style={{ color: 'grey', textAlign: 'center' }}>
      <Row justify="center" style={{ maxWidth: '860' }}>
        <Col xs={24} md={6}>
          Powered by <Image width={30} preview={false} src={reactLogo} />
        </Col>
        <Col xs={24} md={6}>
          Styled with <Image width={20} preview={false} src={antdLogo} />
        </Col>
        <Col xs={24} md={12}>
          Created by Radoslav Smokov ©2023
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
