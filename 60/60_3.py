#!/usr/bin/env python3

from Utils import *

def isOkay(ps, p1, p2):
    newP1 = int(str(p1) + str(p2))
    newP2 = int(str(p2) + str(p1))
    return (newP1 in ps or isPrime(newP1)) and (newP2 in ps or isPrime(newP2))

okayMemo = {}
def arePrimesOkay(ps, primes):
    if len(primes) == 1: return True

    for i, v in enumerate(primes):
        for v2 in primes[i+1:]:
            # if (v, v2) in okayMemo:
                # if not okayMemo[(v, v2)]:
                    # return False
            # elif (v2, v) in okayMemo:
                # if not okayMemo[(v2, v)]:
                    # return False
            # else:
                if not isOkay(ps, v, v2):
                    # okayMemo[(v, v2)] = False
                    # okayMemo[(v2, v)] = False
                    return False

    return True

def addLevel(primeSupplies, primes):
    assert(len(primeSupplies) == len(primes))

    newSupply = list(primeSupplies[-1])
    primes += [newSupply.pop()]
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
    primes[-1] = primeSupplies[-1].pop()

def shedLayersAndAdvance(primeSupplies, primes):
    while not canAdvance(primeSupplies, primes) and len(primes) > 0:
        popLevel(primeSupplies, primes)

    if canAdvance(primeSupplies, primes):
        advanceOnePrime(primeSupplies, primes)

if __name__ == "__main__":
    # Your code here!
    limit = 1000
    digits = 3

    nj = NumberJuggler(limit)
    pl = nj.primeList
    ps = set(pl)

    foundMinimum = digits * limit
    foundGroup = None

    i = 0

    primeSupplies = [list(pl)[::-1]]
    primes = [primeSupplies[0].pop()]
    

    while len(primes) > 0:
        i += 1
        if (i % 100 == 0 and i != 0):
            print("---")
            print([len(x) for x in primeSupplies])
            print(primes)
            print("foundMinimum:", foundMinimum)
            print("foundGroup:", foundGroup)

        if len(primes) == digits and sum(primes) < foundMinimum:
            total = sum(primes)
            if total < foundMinimum and arePrimesOkay(ps, primes):
                foundMinimum = total
                foundGroup = list(primes)

                print("--!!!!--")
                print([len(x) for x in primeSupplies])
                print(primes)
                print("foundMinimum:", foundMinimum)
                print("foundGroup:", foundGroup)
        
            # Next prime iteration
            while not canAdvance(primeSupplies, primes) and len(primes) > 0:
                popLevel(primeSupplies, primes)

            if canAdvance(primeSupplies, primes):
                advanceOnePrime(primeSupplies, primes)

        if len(primes) < digits:
            while len(primes) > 1 and not arePrimesOkay(ps, primes):
                while canAdvance(primeSupplies, primes) and sum(primes) < foundMinimum and not arePrimesOkay(ps, primes):
                    advanceOnePrime(primeSupplies, primes)

                if sum(primes) >= foundMinimum:
                    while sum(primes) >= foundMinimum or not canAdvance(primeSupplies, primes):
                        popLevel(primeSupplies, primes)

                    if canAdvance(primeSupplies, primes):
                        advanceOnePrime(primeSupplies, primes)

                elif not canAdvance(primeSupplies, primes):
                    pass
                elif arePrimesOkay(ps, primes):
                    pass


                # if canAdvance(primeSupplies, primes):
                    # advanceOnePrime(primeSupplies, primes)

            # Add a new prime to the front
            if canAddLevel(primeSupplies, primes):
                addLevel(primeSupplies, primes)
            else:
                while not canAdvance(primeSupplies, primes) and len(primes) > 1:
                    popLevel(primeSupplies, primes)

                if canAdvance(primeSupplies, primes);
                    advanceOnePrime(primeSupplies, primes)

                while not arePrimesOkay(ps, primes) and len(primes) > 1:
                    while canAdvance(primeSupplies, primes) and sum(primes) < foundMinimum and not arePrimesOkay(ps, primes):
                        advanceOnePrime(primeSupplies, primes)

                    # If after the while loop the primes are not okay, pop this level
                    while sum(primes) >= foundMinimum:
                        popLevel(primeSupplies, primes)

                    if canAdvance(primeSupplies, primes):
                        advanceOnePrime(primeSupplies, primes)

        # # Keep cycling until we find primes that fit
        # while not arePrimesOkay(ps, primes) and len(primes) > 1:
            # while canAdvance(primeSupplies, primes) and sum(primes) < foundMinimum and not arePrimesOkay(ps, primes):
                # advanceOnePrime(primeSupplies, primes)

            # # If after the while loop the primes are not okay, pop this level
            # while sum(primes) >= foundMinimum:
                # popLevel(primeSupplies, primes)

            # if canAdvance(primeSupplies, primes):
                # advanceOnePrime(primeSupplies, primes)

    print("New foundMinimum:", foundMinimum)
    print("Group:", foundGroup)