import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://optionspricing.fly.dev/api/" }),
    //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
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
            { spot_prices: number[]; call_prices: number[]; call_deltas: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `delta-call?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getDeltaPut: builder.query<
            { spot_prices: number[]; put_prices: number[]; put_deltas:number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `delta-put?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getThetaCall: builder.query<
            { times: number[]; call_prices: number[]; call_thetas: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `theta-call?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getThetaPut: builder.query<
            { times: number[]; put_prices: number[]; put_thetas:number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `theta-put?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getVegaCall: builder.query<
            { sigmas: number[]; call_prices: number[]; call_vegas: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `vega-call?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getVegaPut: builder.query<
            { sigmas: number[]; put_prices: number[]; put_vegas:number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `vega-put?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getRhoCall: builder.query<
            { rates: number[]; call_prices: number[]; call_rhos: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `rho-call?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getRhoPut: builder.query<
            { rates: number[]; put_prices: number[]; put_rhos:number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `rho-put?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getGammaCall: builder.query<
            { spot_prices: number[]; call_deltas: number[]; call_gammas: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `gamma-call?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getGammaPut: builder.query<
            { spot_prices: number[]; put_deltas: number[]; put_gammas: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `gamma-put?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
        getVomma: builder.query<
            { sigmas: number[]; vegas: number[]; vommas: number[]},
            { S: number; K: number; T: number; r: number; sigma: number }
        >({
            query: ({ S, K, T, r, sigma }) =>
                `vomma?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}`,
        }),
    }),
});

export const {
    useGetCallOptionQuery,
    useGetPutOptionQuery,
    useGetCallOptionMatrixQuery,
    useGetPutOptionMatrixQuery,
    useGetDeltaCallQuery,
    useGetDeltaPutQuery,
    useGetThetaCallQuery,
    useGetThetaPutQuery,
    useGetVegaCallQuery,
    useGetVegaPutQuery,
    useGetRhoCallQuery,
    useGetRhoPutQuery,
    useGetGammaCallQuery,
    useGetGammaPutQuery,
    useGetVommaQuery
} = api;