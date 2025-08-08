from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from black_scholes import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get("/call-option")
async def calculate_call_option(S: float, K: float, T: float, r: float, sigma: float):
    call_price = black_scholes_call(S, K, T, r, sigma)
    return {"call_price": call_price}

@api_router.get("/put-option")
async def calculate_put_option(S: float, K: float, T: float, r: float, sigma: float):
    put_price = black_scholes_put(S, K, T, r, sigma)
    return {"put_price": put_price}

@api_router.get("/call-option-matrix")
async def call_option_matrix(
    K: float,
    T: float,
    r: float,
    min_spot_price: float,
    max_spot_price: float,
    min_volatility: float,
    max_volatility: float,
):
    matrix = calculate_call_option_matrix(
        K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility
    )
    return {"call_option_matrix": matrix}

@api_router.get("/put-option-matrix")
async def put_option_matrix(
    K: float,
    T: float,
    r: float,
    min_spot_price: float,
    max_spot_price: float,
    min_volatility: float,
    max_volatility: float,
):
    matrix = calculate_put_option_matrix(
        K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility
    )
    return {"put_option_matrix": matrix}

@api_router.get("/delta-call")
async def call_delta_array(S: float, K: float, T: float, r: float, sigma: float):
    spot_prices, call_prices, deltas = generate_call_delta_array(S, K, T, r, sigma)
    return {"spot_prices": spot_prices.tolist(), "call_prices": call_prices, "call_deltas": deltas}

@api_router.get("/delta-put")
async def put_delta_array(S: float, K: float, T: float, r: float, sigma: float):
    spot_prices, put_prices, deltas = generate_put_delta_array(S, K, T, r, sigma)
    return {"spot_prices": spot_prices.tolist(), "put_prices": put_prices, "put_deltas": deltas}

@api_router.get("/theta-call")
async def call_theta_array(S: float, K: float, T: float, r: float, sigma: float):
    times, call_prices, thetas = generate_call_theta_array(S, K, T, r, sigma)
    return {"times": times.tolist(), "call_prices": call_prices, "call_thetas": thetas}

@api_router.get("/theta-put")
async def put_theta_array(S: float, K: float, T: float, r: float, sigma: float):
    times, put_prices, thetas = generate_put_theta_array(S, K, T, r, sigma)
    return {"times": times.tolist(), "put_prices": put_prices, "put_thetas": thetas}

@api_router.get("/vega-call")
async def call_vega_array(S: float, K: float, T: float, r: float, sigma: float):
    sigmas, call_prices, vegas = generate_call_vega_array(S, K, T, r, sigma)
    return {"sigmas": sigmas.tolist(), "call_prices": call_prices, "call_vegas": vegas}

@api_router.get("/theta-put")
async def put_vega_array(S: float, K: float, T: float, r: float, sigma: float):
    sigmas, put_prices, vegas = generate_put_vega_array(S, K, T, r, sigma)
    return {"sigmas": sigmas.tolist(), "put_prices": put_prices, "call_vegas": vegas}
app.include_router(api_router)