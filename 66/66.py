#!/usr/bin/env python3

from Utils import *
from math import *

# x ^ 2 - D * y ^ 2 = 1
# x ^ 2 - 1 = D * y ^ 2
# (x ^ 2 - 1) / D = y ^ 2
# sqrt((x ** 2 - 1) / D) = y
def calcY(D, x):
    return sqrt((x ** 2 - 1) / D)

def solve(D):
    x = 2
    while True:
        y = calcY(D, x)
        if y.is_integer():
            return (int(x), D, int(y))


        x += 1

Dcache = {}

def solveCeiled(D, floor, ceiling):
    x = floor
    while True:
        if x >= ceiling: return None

        y = calcY(D, x)
        if y.is_integer():
            return (int(x), D, int(y))

        x += 1

# https://brilliant.org/wiki/quadratic-diophantine-equations-pells-equation/ 
def solveForD(D):
    m = continuedFractionsOfSquareRootOf(D)
    if (len(m) - 1) % 2 == 0:
        # Even case
        # Use everything except the last one
        return collapseFractionExpansion(m[:-1])
    else:
        # Uneven case
        # Use everything and additionally the inner part one more time
        return collapseFractionExpansion(m + m[:-1][1:])

if __name__ == "__main__":
    print(continuedFractionsOfSquareRootOf(5))
    print(continuedFractionsOfSquareRootOf(21))
    print(collapseFractionExpansion(continuedFractionsOfSquareRootOf(21)[:-1]))
    print("21:", solveForD(21))
    print("13:", solveForD(13))
    print(solve(2))
    print(solve(3))
    print(solve(5))
    print(solve(6))
    print(solve(7))

    maxX = -1
    maxD = None
    
    for D in range(2, 1000 + 1):
        if sqrt(D).is_integer(): continue

        (x, y) = solveForD(D)
        
        if x > maxX:
            maxD = D
            maxX = x

    print("Max x:", maxX)
    print("Max D:", maxD)

    # maxX = -1
    # D = None
    # for potentialD in range(2, 1000 + 1):
        # print("Potential D:", potentialD)
        # if potentialD == 61: continue
        # if sqrt(potentialD).is_integer(): continue

        # solution = solve(potentialD)
        
        # print("Solution:", solution)

        # if solution[0] > maxX:
            # maxX = solution[0]
            # D = solution[1]

    # print("max x:", maxX)
    # print("D:", D)

    ###############################

    # Ds = [x for x in list(range(2, 1000 + 1)) if not sqrt(x).is_integer()]

    ##############################

    # floor = 2
    # ceiling = 1000

    # while len(Ds) > 1:
        # # print(Ds)
        # print("Len:", len(Ds))

        # tempDs = list(Ds)
        # for D in tempDs:
            # res = solveCeiled(D, floor, ceiling)
            # if res != None:
                # Ds.remove(D)
        
        # floor = ceiling
        # ceiling += 10000

    ############################
    
    # def xSolvesD(x, D):
        # y = calcY(D, x)
        # return y.is_integer()

    # x = 2

    # while len(Ds) > 1:
        # Ds = [D for D in Ds if not xSolvesD(x, D)]

        # if x % 10000 == 0 and x != 0:
            # print("Len(Ds):", len(Ds), "x:", x)

        # x += 1

    # print("Solution:", Ds)

