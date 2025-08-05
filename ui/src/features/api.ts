import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    //baseQuery: fetchBaseQuery({ baseUrl: "https://optionspricing.fly.dev/api/" }),
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    endpoints: (builder) => ({
        getCallOption: builder.query<{ call_price: number }, { S: number; K: number; T: number; r: number; sigma: number }>({
            query: ({ S, K, T, r, sigma }) =>
                `call-option?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getPutOption: builder.query<{ put_price: number }, { S: number; K: number; T: number; r: number; sigma: number }>({
            query: ({ S, K, T, r, sigma }) =>
                `put-option?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getCallOptionMatrix: builder.query<
            { call_option_matrix: number[][] },
            { K: number; T: number; r: number; min_spot_price: number; max_spot_price: number; min_volatility: number; max_volatility: number }
        >({
            query: ({ K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility }) =>
                `call-option-matrix?K=${K}&T=${T}&r=${r}&min_spot_price=${min_spot_price}&max_spot_price=${max_spot_price}&min_volatility=${min_volatility}&max_volatility=${max_volatility}`,
        }),
        getPutOptionMatrix: builder.query<
            { put_option_matrix: number[][] },
            { K: number; T: number; r: number; min_spot_price: number; max_spot_price: number; min_volatility: number; max_volatility: number }
        >({
            query: ({ K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility }) =>
                `put-option-matrix?K=${K}&T=${T}&r=${r}&min_spot_price=${min_spot_price}&max_spot_price=${max_spot_price}&min_volatility=${min_volatility}&max_volatility=${max_volatility}`,
        }),
        getDeltaCall: builder.query<
            { spot_prices: number[]; call_prices: number[] },
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `delta-call?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getDeltaPut: builder.query<
            { spot_prices: number[]; put_prices: number[] },
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `delta-put?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
    }),
});

export const {
    useGetCallOptionQuery,
    useGetPutOptionQuery,
    useGetCallOptionMatrixQuery,
    useGetPutOptionMatrixQuery,
    useGetDeltaCallQuery,
    useGetDeltaPutQuery
} = api;