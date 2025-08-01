import math
import numpy as np
from scipy.stats import norm

def black_scholes_call(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    call_price = S * norm.cdf(d1) - K * math.exp(-r * T) * norm.cdf(d2)
    return call_price

def black_scholes_put(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    put_price = K * math.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    return put_price

def calculate_call_option_matrix(K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility):
    # Generate evenly spaced spot prices and volatilities
    spot_prices = np.linspace(min_spot_price, max_spot_price, 24)  # 24 evenly spaced values
    volatilities = np.linspace(min_volatility, max_volatility, 12)  # 12 evenly spaced values

    # Create a 2D array for call option prices
    call_option_matrix = []
    for sigma in volatilities:
        row = []
        for S in spot_prices:
            call_price = black_scholes_call(S, K, T, r, sigma)
            row.append(call_price)
        call_option_matrix.append(row)

    return call_option_matrix

def calculate_put_option_matrix(K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility):
    # Generate evenly spaced spot prices and volatilities
    spot_prices = np.linspace(min_spot_price, max_spot_price, 24)  # 24 evenly spaced values
    volatilities = np.linspace(min_volatility, max_volatility, 12)  # 12 evenly spaced values

    # Create a 2D array for put option prices
    put_option_matrix = []
    for sigma in volatilities:
        row = []
        for S in spot_prices:
            put_price = black_scholes_put(S, K, T, r, sigma)
            row.append(put_price)
        put_option_matrix.append(row)

    return put_option_matrix