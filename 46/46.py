#!/usr/bin/env python3

from Utils import *
from math import sqrt

limit = 10000

nj = NumberJuggler(limit)
pl = nj.primeList

print(pl)

if __name__ == "__main__":
    for n in range(3, limit, 2):
        if nj.primeTable[n]:
            continue

        foundAWay = False
        print("Checking", n)

        for prime in pl:
            if prime >= n:
                break
                
            theSquare = sqrt((n - prime) / 2)
        
            if theSquare.is_integer():
                print("\tFound: ", n, "=", prime, " + 2 x", theSquare)
                foundAWay = True
                break
        
        if not foundAWay:
            print("\tFound bad composite: ", n, "=", prime, " + 2 x", theSquare)
            break

