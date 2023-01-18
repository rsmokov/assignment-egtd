import { FC, useState } from 'react';
import { UserPost } from '@/interfaces';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { FieldsRenderer, PostForm } from './';
import { useDeletePostMutation } from '@/store/api/posts';
import { ContentLoadingSpinner } from '@/components';

interface PostCardEditableProps {
  post: UserPost;
}

const { confirm } = Modal;

export const PostCardEditable: FC<PostCardEditableProps> = ({ post }: PostCardEditableProps) => {
  const [showForm, setShowForm] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation({
    fixedCacheKey: `shared-delete-key-${post.id}`,
  });

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'This process is irreversible. Do you still want to delete it ?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deletePost(post).unwrap();
        } catch (error) {
          messageApi.open({
            type: 'error',
            content: 'Post delete failed!',
          });
        }
      },
    });
  };

  return (
    <section style={{ background: '#f2f2f2', padding: '1em', margin: '.5em' }}>
      {contextHolder}
      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '1em' }}>
        <Button style={{ float: 'right' }} onClick={handleToggleForm}>
          {!showForm ? 'Edit post' : 'Close form'}
        </Button>
      </div>
      {isDeleting ? <ContentLoadingSpinner /> : null}
      {!showForm && <FieldsRenderer style={{ padding: '1em' }} obj={post} />}
      {showForm && <PostForm data={post} closeForm={handleToggleForm} />}
      <Button onClick={showDeleteConfirm} danger>
        Delete
      </Button>
    </section>
  );
};
