#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    # Your code here!
    
    limit = 1000000 + 1

    nj = NumberJuggler(limit)

    maxRatio = -1
    maxN = None

    factCache = {1: set()}

    for n in range (2, limit + 1):
        if n % 1000 == 0: print(n, maxN, maxRatio)
        # print(n, maxN, maxRatio)

        # Calculate phi(n)
        factCache[n] = set(nj.getPrimeFactors(n))
        nFactors = factCache[n]
        
        # ps = [1]
        psCount = 0

        for i in range(1, n):
            # if i in factCache:
            iFactors = factCache[i]
            # else:
                # iFactors = set(nj.getPrimeFactors(i))
                # factCache[i] = iFactors

            if len(nFactors & iFactors) == 0:
                # ps += [i]
                psCount += 1

            # if (n/len(ps)) < maxRatio: 
            if (n/psCount) < maxRatio: 
                break

        # ratio = n/len(ps)
        ratio = n/psCount

        if ratio > maxRatio:
            maxN = n
            maxRatio = ratio

    print(maxN, maxRatio)

