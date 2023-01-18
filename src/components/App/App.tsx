import { FC } from 'react';
import AppRoutes from '@/routes';
import BaseLayout from '../Layouts/BaseLayout';
import { ConfigProvider } from 'antd';
import customTheme from './theme';

import 'antd/dist/reset.css';

const App: FC = () => {
  return (
    <ConfigProvider theme={customTheme}>
      <BaseLayout>
        <AppRoutes />
      </BaseLayout>
    </ConfigProvider>
  );
};

export default App;
