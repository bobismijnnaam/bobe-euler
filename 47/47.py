#!/usr/bin/env python3

from Utils import *

limit = 1000000
nj = NumberJuggler(limit)

if __name__ == "__main__":
    n = 1

    consecutiveLen = 4

    while n < limit:
        print("Checking", n)

        okay = True

        for i in range(consecutiveLen):
            okay = okay and len(nj.getPrimeFactors(n + i)) == consecutiveLen

            if not okay:
                break

        if okay:
            print("Found:", n)
            exit()

        n = n + 1

