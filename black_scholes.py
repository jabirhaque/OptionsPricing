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
    spot_prices = np.linspace(min_spot_price, max_spot_price, 24)
    volatilities = np.linspace(min_volatility, max_volatility, 12)

    call_option_matrix = []
    for sigma in volatilities:
        row = []
        for S in spot_prices:
            call_price = black_scholes_call(S, K, T, r, sigma)
            row.append(call_price)
        call_option_matrix.append(row)

    return call_option_matrix

def calculate_put_option_matrix(K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility):
    spot_prices = np.linspace(min_spot_price, max_spot_price, 24)
    volatilities = np.linspace(min_volatility, max_volatility, 12)

    put_option_matrix = []
    for sigma in volatilities:
        row = []
        for S in spot_prices:
            put_price = black_scholes_put(S, K, T, r, sigma)
            row.append(put_price)
        put_option_matrix.append(row)

    return put_option_matrix

def call_deltas(S, K, T, r, sigma):
    return norm.cdf((math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T)))

def put_deltas(S, K, T, r, sigma):
    return norm.cdf((math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))) - 1

def generate_call_delta_array(S, K, T, r, sigma):
    spot_prices = np.linspace(0.5 * S, 1.5 * S, 100)
    call_prices = [black_scholes_call(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    deltas = [call_deltas(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    return spot_prices, call_prices, deltas

def generate_put_delta_array(S, K, T, r, sigma):
    spot_prices = np.linspace(0.5 * S, 1.5 * S, 100)
    put_prices = [black_scholes_put(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    deltas = [put_deltas(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    return spot_prices, put_prices, deltas


def call_theta(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    term1 = - (S * norm.pdf(d1) * sigma) / (2 * math.sqrt(T))
    term2 = - r * K * math.exp(-r * T) * norm.cdf(d2)
    return term1 + term2

def put_theta(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    term1 = - (S * norm.pdf(d1) * sigma) / (2 * math.sqrt(T))
    term2 = r * K * math.exp(-r * T) * norm.cdf(-d2)
    return term1 + term2

def generate_call_theta_array(S, K, T, r, sigma):
    times = np.linspace(0.5 * T, 1.5 * T, 100)
    call_prices = [black_scholes_call(S, K, time, r, sigma) for time in times]
    thetas = [call_theta(S, K, time, r, sigma) for time in times]
    return times, call_prices, thetas

def generate_put_theta_array(S, K, T, r, sigma):
    times = np.linspace(0.5 * T, 1.5 * T, 100)
    put_prices = [black_scholes_put(S, K, time, r, sigma) for time in times]
    thetas = [put_theta(S, K, time, r, sigma) for time in times]
    return times, put_prices, thetas

def vega(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    return S * norm.pdf(d1) * math.sqrt(T) / 100

def generate_call_vega_array(S, K, T, r, sigma):
    sigmas = np.linspace(0.5 * sigma, 1.5 * sigma, 100)
    call_prices = [black_scholes_call(S, K, T, r, s) for s in sigmas]
    vegas = [vega(S, K, T, r, s) for s in sigmas]
    return sigmas, call_prices, vegas

def generate_put_vega_array(S, K, T, r, sigma):
    sigmas = np.linspace(0.5 * sigma, 1.5 * sigma, 100)
    put_prices = [black_scholes_put(S, K, T, r, s) for s in sigmas]
    vegas = [vega(S, K, T, r, s) for s in sigmas]
    return sigmas, put_prices, vegas

def call_rho(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    return K * T * math.exp(-r * T) * norm.cdf(d2) / 100

def put_rho(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    return -K * T * math.exp(-r * T) * norm.cdf(-d2) / 100

def generate_call_rho_array(S, K, T, r, sigma):
    rates = np.linspace(0.5 * r, 1.5 * r, 100)
    call_prices = [black_scholes_call(S, K, T, rate, sigma) for rate in rates]
    rhos = [call_rho(S, K, T, rate, sigma) for rate in rates]
    return rates, call_prices, rhos

def generate_put_rho_array(S, K, T, r, sigma):
    rates = np.linspace(0.5 * r, 1.5 * r, 100)
    put_prices = [black_scholes_put(S, K, T, rate, sigma) for rate in rates]
    rhos = [put_rho(S, K, T, rate, sigma) for rate in rates]
    return rates, put_prices, rhos

def gamma(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    return norm.pdf(d1) / (S * sigma * math.sqrt(T))

def generate_call_gamma_array(S, K, T, r, sigma):
    spot_prices = np.linspace(0.5 * S, 1.5 * S, 100)
    deltas = [call_deltas(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    gammas = [gamma(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    return spot_prices, deltas, gammas

def generate_put_gamma_array(S, K, T, r, sigma):
    spot_prices = np.linspace(0.5 * S, 1.5 * S, 100)
    deltas = [put_deltas(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    gammas = [gamma(spot_price, K, T, r, sigma) for spot_price in spot_prices]
    return spot_prices, deltas, gammas

def vomma(S, K, T, r, sigma):
    d1 = (math.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    return S * norm.pdf(d1) * math.sqrt(T) * d1 * d2 / sigma

def generate_vomma_array(S, K, T, r, sigma):
    sigmas = np.linspace(0.5 * sigma, 1.5 * sigma, 100)
    vegas = [vega(S, K, T, r, s) for s in sigmas]
    vommas = [vomma(S, K, T, r, s) for s in sigmas]
    return sigmas, vegas, vommas