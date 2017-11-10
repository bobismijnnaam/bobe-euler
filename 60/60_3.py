#!/usr/bin/env python3

from Utils import *

def isOkay(ps, p1, p2):
    newP1 = int(str(p1) + str(p2))
    newP2 = int(str(p2) + str(p1))
    return (newP1 in ps or isPrime(newP1)) and (newP2 in ps or isPrime(newP2))

def arePrimesOkay(ps, primes):
    for i, v in enumerate(primes):
        for v2 in primes[i+1:]:
            if not isOkay(ps, v, v2):
                return False

    return True

def addLevel(primeSupplies, primes):
    assert(len(primeSupplies) == len(primes))

    newSupply = list(primeSupplies[-1])
    primes += [newSupply.pop(0)]
    primeSupplies += [newSupply]

def popLevel(primeSupplies, primes):
    assert(len(primeSupplies) == len(primes))

    primeSupplies.pop()
    primes.pop()

def canAdvance(primeSupplies, primes):
    if len(primeSupplies) == 0: return False

    return len(primeSupplies[-1]) > 0

def canAddLevel(primeSupplies, primes):
    if len(primeSupplies) == 0: return False

    return len(primeSupplies[-1]) > 0

def advanceOnePrime(primeSupplies, primes):
    primes[-1] = primeSupplies[-1].pop(0)

def shedLayersAndAdvance(primeSupplies, primes):
    while not canAdvance(primeSupplies, primes) and len(primes) > 0:
        popLevel(primeSupplies, primes)

    if canAdvance(primeSupplies, primes):
        advanceOnePrime(primeSupplies, primes)

if __name__ == "__main__":
    # Your code here!
    limit = 1000
    digits = 4

    nj = NumberJuggler(limit)
    pl = nj.primeList
    ps = set(pl)

    foundMinimum = digits * limit
    foundGroup = None

    i = 0

    primeSupplies = [list(pl)]
    primes = [primeSupplies[0][0]]
    primeSupplies[0].pop()

    while len(primes) > 0:
        # print("---")
        # print([len(x) for x in primeSupplies])
        # print(primes)

        if len(primes) == digits:
            total = sum(primes)
            if total < foundMinimum and arePrimesOkay(ps, primes):
                foundMinimum = total
                foundGroup = list(primes)
        
            # Next prime iteration
            if canAdvance(primeSupplies, primes):
                advanceOnePrime(primeSupplies, primes)
            else:
                shedLayersAndAdvance(primeSupplies, primes)

        else:
            # Add a new prime to the front
            if canAddLevel(primeSupplies, primes):
                addLevel(primeSupplies, primes)
            
                # Check if the sum is still little enough
                if sum(primes) >= foundMinimum:
                    # TODO: These two if branches should be combined somehow
                    shedLayersAndAdvance(primeSupplies, primes)
                else:
                    # Keep cycling until we find primes that fit
                    while not arePrimesOkay(ps, primes) and canAdvance(primeSupplies, primes):
                        advanceOnePrime(primeSupplies, primes)

                    # If after the while loop the primes are not okay, pop this level
                    if not arePrimesOkay(ps, primes):
                        while not canAdvance(primeSupplies, primes) and len(primes) > 0:
                            popLevel(primeSupplies, primes)

                        if canAdvance(primeSupplies, primes):
                            advanceOnePrime(primeSupplies, primes)
            else:
                shedLayersAndAdvance(primeSupplies, primes)

                    
        
            

    print("New foundMinimum:", foundMinimum)
    print("Group:", foundGroup)
