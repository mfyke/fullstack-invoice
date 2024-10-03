import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { userToken: string } }).auth.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => '/invoices',
    }),
  }),
});

export const { useGetInvoicesQuery } = invoiceApi;