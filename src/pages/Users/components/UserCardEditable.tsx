import { FC, useState } from 'react';
import { User } from '@/interfaces';
import { FieldsRenderer } from './';
import { Button } from 'antd';
import UserForm from './UserForm';

interface UserCardEditableProps {
  user: User;
}

export const UserCardEditable: FC<UserCardEditableProps> = ({ user }: UserCardEditableProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '1em' }}>
        <Button style={{ float: 'right' }} onClick={handleToggleForm}>
          {!showForm ? 'Edit User' : 'Close form'}
        </Button>
      </div>
      {!showForm && <FieldsRenderer style={{ padding: '1em' }} obj={user} />}
      {showForm && <UserForm data={user} closeForm={handleToggleForm} />}
    </section>
  );
};
