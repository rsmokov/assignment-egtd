import { FC } from 'react';
import { Alert, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TaskStatus } from './components';
import { useGetTasksQuery, useGetUsersQuery } from '@/store/api';
import { User, UserTask, UserTaskFormatted } from '@/interfaces';
import { useColumnSearchProps } from './hooks/columSearchProps.hook';
import { generateUsersMap } from './utils';

export const Tasks: FC = () => {
  const getColumnSearchProps = useColumnSearchProps();
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const { data: users } = useGetUsersQuery();

  const usersMap = generateUsersMap(users as User[]);
  const tasksList = tasks?.map((task: UserTask) => ({ ...task, userName: usersMap.get(task.userId) })) || [];

  const columns: ColumnsType<UserTaskFormatted> = [
    {
      title: 'Completed',
      dataIndex: 'completed',
      width: 100,
      filterMultiple: false,
      filters: [
        {
          text: 'completed',
          value: true,
        },
        {
          text: 'to do',
          value: false,
        },
      ],
      onFilter: (value, task) => task.completed === value,
      render: (_, task) => <TaskStatus task={task} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Task ID',
      dataIndex: 'id',
      width: 100,
      ...getColumnSearchProps('id'),
    },
    {
      title: 'User',
      dataIndex: 'userName',
      width: 100,
      ...getColumnSearchProps('userName'),
    },
  ];

  return (
    <>
      <section>
        <Typography.Title style={{ marginBottom: '1em' }}>Tasks Assigned Per User</Typography.Title>
        <Alert
          showIcon={true}
          style={{ marginBottom: '2em' }}
          description="The task can be marked as completed and filter can be applied. 
            For filtering press the funnel icon to popup the filter menu. 
            Filtering by task status (completed or not completed), title and owner (user) is allowed."
          type="info"
        />
      </section>
      <section>
        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={tasksList} />
        {isError ? (
          <Alert
            showIcon={true}
            style={{ margin: '2em 0' }}
            message="Error"
            description={<>Error occured durring fetching the tasks list.</>}
            type="error"
          />
        ) : null}
      </section>
    </>
  );
};

export default Tasks;
