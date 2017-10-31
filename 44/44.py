#!/usr/bin/env python3

import math
import sys

def pentagonalN(n):
    return n * (3 * n - 1) / 2

def isPentagonal(pn):
    l = 1/6 * (1 + math.sqrt(24 * pn + 1))
    # r = 1/6 * (1 - math.sqrt(24 * pn + 1))

    return l.is_integer() # or r.is_integer()

limit = 10000
if len(sys.argv) > 1:
    limit = int(sys.argv[1])

print("Limit: ", limit)

isDFound = False
D = -1

for j in range(1, limit):
    for k in range(j, limit):
        Pj = pentagonalN(j)
        Pk = pentagonalN(k)
        candidateD = math.fabs(Pj - Pk)

        if isPentagonal(math.fabs(Pj - Pk)) and isPentagonal(Pj + Pk):
            print("Candidate pair:", Pj, "and", Pk)

            if not isDFound:
                D = math.fabs(Pj - Pk)
                print("\tFirst smallest D!")
                isDFound = True
            elif candidateD < D:
                D = candidateD
                print("Smallest D!")
                
print("D =", D)

# 5482660 
