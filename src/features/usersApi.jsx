import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api' }),
  tagTypes: ['User'], 
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        let allUsers = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
          const response = await baseQuery(`/users?page=${page}`);
          if (response.error) {
            return { error: response.error };
          }

          const { data, total_pages } = response.data;
          allUsers = [...allUsers, ...data]; 
          totalPages = total_pages;
          page += 1;
        }

        return { data: allUsers };
      },
      providesTags: ['User'], 
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'], 
    }),
  }),
});

export const { useFetchUsersQuery, useAddUserMutation } = usersApi;
