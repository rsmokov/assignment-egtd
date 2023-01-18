import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RouteErrorBoundary from '@/components/RouteErrorBoundary';
import { UsersLayout } from '@/components/Layouts';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { Tasks } from '@/pages';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Users = lazy(() => import('@/pages/Users/Users'));
const UserPosts = lazy(() => import('@/pages/Users/UserPosts'));

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AppRoutes: FC = () => (
  <Suspense fallback={<Spin indicator={antIcon} />}>
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace={false} />} errorElement={<RouteErrorBoundary />} />
      <Route path="/users" element={<UsersLayout />} errorElement={<RouteErrorBoundary />}>
        <Route index element={<Users />} />
        <Route path="list" element={<Users />} errorElement={<RouteErrorBoundary />} />
        <Route path=":id/posts" element={<UserPosts />} errorElement={<RouteErrorBoundary />} />
      </Route>
      <Route path="/tasks" element={<Tasks />} errorElement={<RouteErrorBoundary />} />
      <Route path="*" element={<NotFound />} errorElement={<RouteErrorBoundary />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
