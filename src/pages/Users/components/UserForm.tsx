import { FC, useState } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import { User } from '@/interfaces';
import { ContentLoadingSpinner } from '@/components';
import { useUpdateUserMutation } from '@/store/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface UserFormProps {
  data: User;
  closeForm: () => void;
}

export const UserForm: FC<UserFormProps> = ({ data, closeForm }: UserFormProps) => {
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation({
    fixedCacheKey: `shared-user-key-${data.id}`,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser).unwrap();
      closeForm();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'User update failed!',
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
        <Form.Item name="name" label="Name" rules={[{ min: 3 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username" rules={[{ required: true, min: 4 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Address">
          <Input.Group compact>
            <Form.Item name={['address', 'street']} label="Street" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['address', 'suite']} label="Suite" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['address', 'city']} label="City" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['address', 'zipcode']} label="Zipcode" rules={[{ min: 3 }]}>
              <Input />
            </Form.Item>
            <Input.Group compact>
              <Form.Item name={['address', 'geo', 'lat']} label="Lattitude" rules={[{ min: 7 }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['address', 'geo', 'lng']} label="Longitude" rules={[{ min: 7 }]}>
                <Input />
              </Form.Item>
            </Input.Group>
          </Input.Group>
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

export default UserForm;
