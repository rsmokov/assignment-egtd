import { FC } from 'react';
import { Collapse, theme, Typography, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { User } from '@/interfaces';
import { Link } from 'react-router-dom';
import { UserCardEditable } from './UserCardEditable';

const { Panel } = Collapse;
const { Title } = Typography;

interface UserListProps {
  users: User[] | undefined;
}
const UserList: FC<UserListProps> = ({ users }: UserListProps) => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    padding: 20,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <section>
      <Title>User List</Title>
      <Collapse
        collapsible="header"
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition="start"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
      >
        {users?.map(user => (
          <Panel showArrow={true} header={user.name} key={`panel-user-${user.id}`} style={panelStyle}>
            <UserCardEditable user={user} />
            <Link style={{ float: 'right', marginTop: '.5em' }} to={`/users/${user.id}/posts`}>
              <Button type="primary">See Posts</Button>
            </Link>
          </Panel>
        ))}
      </Collapse>
    </section>
  );
};

export default UserList;
