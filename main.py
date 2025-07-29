from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from black_scholes import black_scholes_call, black_scholes_put

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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

app.include_router(api_router)