#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    limit = 10**6
    nj = NumberJuggler(limit)
    primeSet = set(nj.primeList)

    longest = 0
    longestPrime = 0
    # longestPrimeList = []

    ## Old approach
    # for primes in sublists(nj.primeList):
        # total = sum(primes)
        # if total > limit: continue
        # if total in primeSet:
            # if len(primes) > longest:
                # longest = len(primes)
                # longestPrime = total
                # longestPrimeList = primes
                # print("-----------------------")
                # print("Length:", longest, "of", len(nj.primeList))
                # print("Prime:", longestPrime)

    # print("----- Max ------------------")
    # print("Length:", longest, "of", len(nj.primeList))
    # print("Prime:", longestPrime)

    ## New shiny fast approach
    numPrimes = len(nj.primeList)

    for start in range(numPrimes):
        total = 0
        length = 0

        for i in range(numPrimes - start):
            total += nj.primeList[start + i]
            length += 1
            
            if total > limit:
                break
            
            if length > longest and total in primeSet:
                longest = length
                longestPrime = total
                print("-----------------------")
                print("Length:", longest, "of", len(nj.primeList))
                print("Prime:", longestPrime)
