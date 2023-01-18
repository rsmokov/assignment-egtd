import { FC } from 'react';
import { Alert, Typography, Collapse } from 'antd';
import { useGetUsersQuery, useGetUserPostsQuery } from '@/store/api';
import { useLocation } from 'react-router-dom';
import ContentLoadingSpinner from '@/components/ContentLoadingSpinner';
import { UserCardEditable, PostCardEditable } from './components';

const { Title } = Typography;
const { Panel } = Collapse;

export const UserPosts: FC = () => {
  const location = useLocation();
  const userId = location.pathname.split('/').filter(snippet => snippet)[1];

  // While jsonplaceholder API is not actually updating the user list, calling "users/id" endpoint will revalidate our query in redux, so
  // the data for "user" query will be revalidated and any changes on this query will be gone.
  // Both queries "users" and "users/id" will have missmatching data. The followind query is for real life APIs:
  // const { data: user, isError: isUserError, isLoading: isUserLoading } = useGetUserQuery(Number(userId));

  // So in order to keep consistent data across pages (user list and user details), we use the same query "users"
  // and filter the data by id
  const { data: users, isError: isUserError, isLoading: isUserLoading } = useGetUsersQuery();
  const user = users?.find(user => user.id === Number(userId));
  const { data: posts, isError: isPostsError, isLoading: isPostsLoading } = useGetUserPostsQuery(Number(userId));

  return (
    <article>
      <Title>User Posts</Title>
      <section>
        <Title level={3}>User Details:</Title>
        {isUserLoading ? <ContentLoadingSpinner /> : null}
        {!isUserError ? (
          <Collapse bordered={false}>
            <Panel header="Click to see details about the author of this post.." key="1">
              <UserCardEditable user={user!} />
            </Panel>
          </Collapse>
        ) : (
          <Alert
            style={{ margin: '2em' }}
            type="error"
            message="Error"
            description="Some error happend, while fetching user details!"
          />
        )}
      </section>
      <section>
        <Title level={3}>User Posts:</Title>
        {isPostsLoading ? <ContentLoadingSpinner /> : null}
        {!isPostsError ? (
          posts?.map(post => <PostCardEditable key={`post-card-${post.id}`} post={post!} />)
        ) : (
          <Alert
            style={{ margin: '2em' }}
            type="error"
            message="Error"
            description="Some error happend, while fetching user posts!"
          />
        )}
      </section>
    </article>
  );
};

export default UserPosts;
