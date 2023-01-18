import { FC } from 'react';
import { Alert } from 'antd';
import { useGetUsersQuery } from '@/store/api';
import { ContentLoadingSpinner } from '@/components';
import UserList from './components/UserList';

export const Users: FC = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  // limi tto 10 users if more from the service
  const usersList = users?.slice(0, 9);

  return (
    <>
      {isLoading ? <ContentLoadingSpinner /> : null}
      {!isError ? (
        <UserList users={usersList} />
      ) : (
        <Alert
          style={{ margin: '2em' }}
          type="error"
          message="Error"
          description="Some error happend, while fetching user list!"
        />
      )}
    </>
  );
};

export default Users;
