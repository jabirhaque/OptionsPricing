from fastapi import FastAPI
from black_scholes import black_scholes_call, black_scholes_put

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/call-option")
async def calculate_call_option(S: float, K: float, T: float, r: float, sigma: float):
    call_price = black_scholes_call(S, K, T, r, sigma)
    return {"call_price": call_price}

@app.get("/put-option")
async def calculate_put_option(S: float, K: float, T: float, r: float, sigma: float):
    put_price = black_scholes_put(S, K, T, r, sigma)
    return {"put_price": put_price}

#http://127.0.0.1:8000/call-option?S=100&K=90&T=1&r=0.05&sigma=0.3