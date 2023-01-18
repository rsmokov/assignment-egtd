import { FC } from 'react';
import { Checkbox, message } from 'antd';
import { useUpdateTaskMutation } from '@/store/api';
import { UserTask } from '@/interfaces';

interface TaskStatusProps {
  task: Partial<UserTask>;
}

export const TaskStatus: FC<TaskStatusProps> = ({ task }: TaskStatusProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { completed } = task;
  const [updateTask] = useUpdateTaskMutation({
    fixedCacheKey: 'shared-update-task',
  });
  const handleCheckboxChange = async () => {
    try {
      await updateTask({ id: task.id!, completed: !task.completed }).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Task status did not change!',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Checkbox defaultChecked={completed} onChange={handleCheckboxChange} />
    </>
  );
};
