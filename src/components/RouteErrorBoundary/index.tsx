import { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import { Alert } from 'antd';

const RouteErrorBoundary: FC = () => {
  const error = useRouteError();

  console.error(error);

  return <Alert type="error" message="Some error happend, please see the console!" banner />;
};

export default RouteErrorBoundary;
