import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserResponse, UsersResponse } from '@/interfaces/users';
import { BASE_URL } from '../config';

export const usersApi = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUser: builder.query<UserResponse, number>({
      query: (id: number) => `users/${id}`,
      providesTags: ['Users'],
    }),
    getUsers: builder.query<UsersResponse, void>({
      query: () => `users`,
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResultUsers = dispatch(
          usersApi.util.updateQueryData('getUsers', void 0, draft => {
            const newState = draft.map((user, index) => {
              if (user.id === id) return { ...draft[index], ...patch };

              return user;
            });

            Object.assign(draft, newState);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResultUsers.undo();
        }

        queryFulfilled.catch(patchResultUsers.undo);
      },

      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery, useUpdateUserMutation } = usersApi;
