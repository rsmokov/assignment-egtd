import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './api/tasks';
import { usersApi } from './api/users';
import { postsApi } from './api/posts';

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([tasksApi.middleware, usersApi.middleware, postsApi.middleware]),
});

export default store;
