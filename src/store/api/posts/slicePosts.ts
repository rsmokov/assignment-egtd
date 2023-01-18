import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserPost, PostsResponse } from '@/interfaces';
import { BASE_URL } from '../config';

export const postsApi = createApi({
  reducerPath: 'apiPosts',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getUserPosts: builder.query<PostsResponse, number>({
      query: userId => `posts?userId=${userId}`,
      providesTags: ['Posts'],
    }),
    updatePost: builder.mutation<UserPost, Partial<UserPost> & Pick<UserPost, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, userId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getUserPosts', userId!, draft => {
            const newState = draft.map((post, index) => {
              if (post.id === id) return { ...draft[index], ...patch };

              return post;
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getUserPosts', userId, draft => {
            const index = draft.findIndex(post => post.id === id);

            if (index !== -1) draft.splice(index, 1);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }

        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
  }),
});

export const { useGetUserPostsQuery, useUpdatePostMutation, useDeletePostMutation } = postsApi;
