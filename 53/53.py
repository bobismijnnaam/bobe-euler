#!/usr/bin/env python3

from Utils import *

def factorial(n):
    if n == 0: return 1
    return n * factorial(n - 1)

def nCr(n, r):
    assert(r <= n)
    return factorial(n) / (factorial(r) * factorial(n - r))

if __name__ == "__main__":
    # Your code here!
    count = 0
    for n in range(1, 100 + 1):
        print("Checking", n)
        print("Progress", count)
        for r in range(1, n + 1):
            if nCr(n, r) > 1000000:
                count += 1
    print("Count", count)
