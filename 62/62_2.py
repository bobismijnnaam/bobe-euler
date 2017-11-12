#!/usr/bin/env python3

from Utils import *

def permute(xs):
    k = None
    for i in range(len(xs) - 1):
        if xs[i] < xs[i + 1]: k = i

    if k == None: return False

    l = None
    for i in range(k, len(xs)):
        if xs[k] < xs[i]: l = i

    xs[k], xs[l] = xs[l], xs[k]
    xs[k+1:] = xs[k+1:][::-1]

    return True

def permutations(xs):
    indices = list(range(len(xs)))

    yield [xs[i] for i in indices]

    keepLooping = permute(indices)

    while keepLooping:
        keepLooping = permute(indices)
        if keepLooping: yield [xs[i] for i in indices]

def isCube(n):
    nRoot = int(round(n ** (1.0/3.0)))
    return n == nRoot ** 3

def factorial(n):
    if n == 1: return 1
    
    return n * factorial(n - 1)

def areNumbersPermutationsOfEachother(a, b):
    return sorted(list(str(a))) == sorted(list(str(b)))

def getUpperBound(n):
    bigUpperBound = "".join(["9" for _ in list(str(int(n ** 3)))])
    bigUpperBound = int(bigUpperBound)

    return ceil(bigUpperBound ** (1.0/3.0))

def checkCube(numPerms, n):
    upperBound = getUpperBound(n)

    # print("Checking", n, "to", upperBound)

    nCubed = int(n ** 3)
    cubePerms = [(n, nCubed)]
    for candidateN in range(n + 1, upperBound):
        candidateNCubed = int(candidateN ** 3)
        if areNumbersPermutationsOfEachother(nCubed, candidateNCubed):
            cubePerms += [(candidateN, candidateNCubed)]

    # print("Result len:", len(cubePerms))
    # print("Result:", cubePerms)

    return cubePerms

    # cubeCount = 0
    # cubePerms = []
    # seen = set()
    # print("Checking:", cube, round(cube ** (1.0/3.0)))

    # numCombinations = factorial(len(str(cube)))

    # i = 0
    # neededLen = len(str(cube))
    # for permCube in permutations(list(str(cube))):
        # i += 1

        # permCube = int("".join(permCube))

        # if len(str(permCube)) != neededLen: continue

        # if permCube in seen:
            # continue
        # else:
            # seen.add(permCube)

        # # print("Considering", permCube)

        # if isCube(permCube):
            # print("Match:", permCube, round(permCube ** (1.0/3.0)))
            # cubeCount += 1
            # cubePerms += [permCube]

            # if cubeCount > numPerms: break

        # if ((numCombinations - i) + cubeCount) < numPerms: break

    # if min(cubePerms) == 1:
        # return (-1, [-1])

    # return (cubeCount, cubePerms)

if __name__ == "__main__":
    limit = 6000
    numPerms = 5

    cubes = [int(n**3) for n in range(2, limit)]

    for n in range(2, limit):
        cubePerms = checkCube(numPerms, n)

        if len(cubePerms) == numPerms:
            print("Found:", cubePerms)
            print(min(cubePerms))
            print(min([t[1] for t in cubePerms]))
            exit()

        # (cubeCount, cubePerms) = checkCube(numPerms, cube)

        # if cubeCount == numPerms:
            # print("Found:", cubePerms)
            # print(min(cubePerms))
            # exit()

    print("Not found")
