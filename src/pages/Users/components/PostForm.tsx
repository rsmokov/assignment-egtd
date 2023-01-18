import { FC, useState } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import { UserPost } from '@/interfaces';
import { ContentLoadingSpinner } from '@/components';
import { useUpdatePostMutation } from '@/store/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface PostFormProps {
  data: UserPost;
  closeForm: () => void;
}

export const PostForm: FC<PostFormProps> = ({ data, closeForm }: PostFormProps) => {
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation({
    fixedCacheKey: `shared-post-key-${data.id}`,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (updatedPost: UserPost) => {
    try {
      await updatePost(updatedPost).unwrap();
      closeForm();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Post update failed!',
      });
    }
  };

  const onChange = () => {
    if (disabledButtons) setDisabledButtons(false);
  };

  return (
    <>
      {isUpdating ? <ContentLoadingSpinner /> : null}
      {contextHolder}
      <Form {...layout} initialValues={data} name="nest-messages" onFinish={onFinish} onChange={onChange}>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="userId" label="UserId" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true, min: 5 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="body" label="Body" rules={[{ required: true, min: 5 }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Space>
            <Button disabled={disabledButtons} onClick={closeForm}>
              Cancel
            </Button>
            <Button disabled={disabledButtons} type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default PostForm;
