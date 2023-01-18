import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ContentLoadingSpinner: FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: '5vw' }} spin />;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        flexDirection: 'column',
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default ContentLoadingSpinner;
