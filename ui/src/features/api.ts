import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    endpoints: (builder) => ({
        getRoot: builder.query<{ message: string }, void>({
            query: () => "/",
        }),
        getCallOption: builder.query<{ call_price: number }, { S: number; K: number; T: number; r: number; sigma: number }>({
            query: ({ S, K, T, r, sigma }) =>
                `call-option?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getPutOption: builder.query<{ put_price: number }, { S: number; K: number; T: number; r: number; sigma: number }>({
            query: ({ S, K, T, r, sigma }) =>
                `put-option?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
    }),
});

export const {
    useGetRootQuery,
    useGetCallOptionQuery,
    useGetPutOptionQuery,
} = api;