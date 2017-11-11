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

def checkCube(numPerms, cube):
    cubeCount = 0
    cubePerms = []
    seen = set()
    print("Checking:", cube, round(cube ** (1.0/3.0)))

    numCombinations = factorial(len(str(cube)))

    i = 0
    neededLen = len(str(cube))
    for permCube in permutations(list(str(cube))):
        i += 1


        permCube = int("".join(permCube))

        if len(str(permCube)) != neededLen: continue

        if permCube in seen:
            continue
        else:
            seen.add(permCube)

        # print("Considering", permCube)

        if isCube(permCube):
            print("Match:", permCube, round(permCube ** (1.0/3.0)))
            cubeCount += 1
            cubePerms += [permCube]

            if cubeCount > numPerms: break

        if ((numCombinations - i) + cubeCount) < numPerms: break

    if min(cubePerms) == 1:
        return (-1, [-1])

    return (cubeCount, cubePerms)

if __name__ == "__main__":
    # Your code here!

    limit = 3000
    numPerms = 3
    cubes = [int(n**3) for n in range(2, limit)]

    # for ns in permutations([1, 2, 2, 3]):
        # print(ns)
    # exit()

    for cube in cubes:
        (cubeCount, cubePerms) = checkCube(numPerms, cube)

        # cubeCount = 0
        # cubes = []
        # seen = set()
        # print("Checking:", cube, round(cube ** (1.0/3.0)))

        # numCombinations = factorial(len(str(cube)))

        # i = 0
        # for permCube in permutations(list(str(cube))):
            # i += 1

            # permCube = int("".join(permCube))

            # if permCube in seen:
                # continue
            # else:
                # seen.add(permCube)

            # print("Considering", permCube)

            # if isCube(permCube):
                # print("Match:", permCube, round(permCube ** (1.0/3.0)))
                # cubeCount += 1
                # cubes += [permCube]

                # if cubeCount > numPerms: break

            # if ((numCombinations - i) + cubeCount) < numPerms: break

        if cubeCount == numPerms:
            print("Found:", cubePerms)
            print(min(cubePerms))
            exit()

    print("Not found")

    # for c in cubes:
        # print(c, round((c ** (1.0/3.0))), isCube(c))

    # a = [1, 2, 3, 4, 5]
    # for i in range(100):
        # permute(a)
        # print(a)
