import unittest
from black_scholes import (
    black_scholes_call,
    black_scholes_put,
    calculate_call_option_matrix,
    calculate_put_option_matrix,
)


class TestBlackScholes(unittest.TestCase):
    def test_black_scholes_call(self):
        S, K, T, r, sigma = 100, 100, 1, 0.05, 0.2
        expected_call_price = 10.4506
        call_price = black_scholes_call(S, K, T, r, sigma)
        self.assertAlmostEqual(call_price, expected_call_price, places=4)

    def test_black_scholes_put(self):
        S, K, T, r, sigma = 100, 100, 1, 0.05, 0.2
        expected_put_price = 5.5735
        put_price = black_scholes_put(S, K, T, r, sigma)
        self.assertAlmostEqual(put_price, expected_put_price, places=4)

    def test_calculate_call_option_matrix(self):
        K, T, r = 100, 1, 0.05
        min_spot_price, max_spot_price = 50, 150
        min_volatility, max_volatility = 0.1, 0.5
        matrix = calculate_call_option_matrix(K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility)

        self.assertEqual(len(matrix), 12)
        self.assertEqual(len(matrix[0]), 24)
        self.assertGreater(matrix[0][0], 0)

    def test_calculate_put_option_matrix(self):
        K, T, r = 100, 1, 0.05
        min_spot_price, max_spot_price = 50, 150
        min_volatility, max_volatility = 0.1, 0.5
        matrix = calculate_put_option_matrix(K, T, r, min_spot_price, max_spot_price, min_volatility, max_volatility)

        self.assertEqual(len(matrix), 12)
        self.assertEqual(len(matrix[0]), 24)
        self.assertGreater(matrix[0][0], 0)


if __name__ == "__main__":
    unittest.main()