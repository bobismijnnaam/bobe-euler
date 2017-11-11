#!/usr/bin/env python3

from Utils import *

def isOkay(ps, p1, p2):
    newP1 = int(str(p1) + str(p2))
    newP2 = int(str(p2) + str(p1))
    return (newP1 in ps or isPrime(newP1)) and (newP2 in ps or isPrime(newP2))

def isCombination(indices):
    return len(indices) == len(set(indices))

def isFinished(indices, indexLimit):
    return indices[-1] >= indexLimit

def nextIndicesWithShort(indices, indexLimit, pl, foundMinimum):
    indices[0] += 1
    
    # print("Before:", indices)
    for i in range(len(indices[:-1])):
        v = indices[i]

        # print("During:", i, v, indices)

        if v >= indexLimit:
            indices[i] -= indexLimit
            indices[i + 1] += 1

        # Short the computation if the current index already exceeds the found minimum
        # print(i, v)
        elif pl[v] >= foundMinimum:
            indices[i + 1] += 1
            for j in range(i + 1):
                indices[j] = 0
        elif sum([pl[pi] for pi in indices[i:]]) >= foundMinimum:
            indices[i + 1] += 1
            for j in range(i + 1):
                indices[j] = 0
    # print("After:", indices)

def isCool(ps, pl, indices):
    for i in range(len(indices)):
        for j in range(i + 1, len(indices)):
            # print(i, j, len(indices))
            # print(indices[i], indices[j])
            # print(len(pl))
            if not isOkay(ps, pl[indices[i]], pl[indices[j]]):
                return False

    return True

if __name__ == "__main__":
    # Your code here!
    limit = 674
    digits = 5

    nj = NumberJuggler(limit)
    pl = nj.primeList
    ps = set(pl)

    indexLimit = len(pl)
    foundMinimum = digits * limit
    foundGroup = None
    indices = list(range(digits))

    i = 0
    while not isFinished(indices, indexLimit):
        print(indices)

        if not isCombination:
            nextIndicesWithShort(indices, indexLimit, pl, foundMinimum)
            continue

        # Check if the higher indices are compatible with eachother
        mustContinue = False
        for j in range(len(indices) - 2, 0, -1):
            if indices[j] == 0:
                if not isCool(ps, pl, indices[j:]):
                    # Skip all the indices
                    for k in range(j + 1):
                        indices[k] = indexLimit - 1
                    nextIndicesWithShort(indices, indexLimit, pl, foundMinimum)
                    mustContinue = True
                    break
        if mustContinue: continue

        i += 1
        if i % 100000 == 0: print(indices)
        if isCool(ps, pl, indices):
            total = sum([pl[i] for i in indices])
            if total < foundMinimum:
                foundMinimum = total
                foundGroup = [pl[i] for i in indices]
                print("New foundMinimum:", foundMinimum)
                print("Group:", foundGroup)

        nextIndicesWithShort(indices, indexLimit, pl, foundMinimum)

    print("New foundMinimum:", foundMinimum)
    print("Group:", foundGroup)
