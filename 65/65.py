#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    # Your code here!

    # For approximation of sqrt(2)...
    # ms = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2]

    # Build it for e
    mss = [[1, 2*k, 1] for k in range(1, 100)]
    ms = [2] + sum(mss, [])
    ms = ms[:100]

    # print(ms)

    numerator = 1
    denominator = ms[-1]

    ms.pop()

    while len(ms) > 0:
        m = ms[-1]
        ms.pop()

        numerator += m * denominator
        
        if len(ms) > 0: numerator, denominator = denominator, numerator
    
    print(numerator, "/", denominator)

    print("Answer:", sum([int(x) for x in list(str(numerator))]))
