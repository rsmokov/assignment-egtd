import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserTask, UserTaskResponse } from '@/interfaces/tasks';
import { BASE_URL } from '../config';

export const tasksApi = createApi({
  reducerPath: 'apiTasks',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getTasks: builder.query<UserTaskResponse, void>({
      query: () => `todos`,
      providesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<UserTask, Partial<UserTask> & Pick<UserTask, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', void 0, draft => {
            const newState = draft.map((task, index) => {
              if (task.id === id) return { ...draft[index], ...patch };

              return task;
            });

            Object.assign(draft, newState);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }

        queryFulfilled.catch(patchResult.undo);
      },

      invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }],
    }),
  }),
});

export const { useGetTasksQuery, useUpdateTaskMutation } = tasksApi;
