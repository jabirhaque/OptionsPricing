from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from black_scholes import *

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://options-pricing-jabir.vercel.app"],
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

app.include_router(api_router)