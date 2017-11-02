#!/usr/bin/env python3

from Utils import *

def bitIsOn(num, i):
    bitFlag = 2**i
    return num & bitFlag == bitFlag

def replaceWith(num, pat, digit):
    digit = str(digit)

    num = list(str(num))
    
    # print("Input:", num)

    for i in range(len(num)):
        if bitIsOn(pat, i):
            num[-1 - i] = digit

    # print("Result:", num)

    return int("".join(num))

if __name__ == "__main__":
    limit = 1000000
    nj = NumberJuggler(limit)
    ps = set(nj.primeList)
    for prime in nj.primeList:
        # Pattern with all bits turned to 1
        maxPat = 2**len(str(prime)) - 1
        for pat in range(maxPat + 1):
            numPrimes = 0
            foundPrimes = []

            jStart = 0
            if ((2**(len(str(prime))) - 1) & pat) == pat:
                jStart = 1

            for j in range(jStart, 10):
                if replaceWith(prime, pat, j) in ps:
                    numPrimes += 1
                    foundPrimes += [replaceWith(prime, pat, j)]

            if numPrimes == 8 and prime in foundPrimes:
                print("Found:", prime)
                print("Pat:", pat)
                print(foundPrimes)
                exit()

