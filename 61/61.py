#!/usr/bin/env python3

from Utils import *

def triangle(n): return int((n * (n+1)) / 2)

def square(n): return int(n ** 2)

def pentagonal(n): return int((n * (3 * n - 1)) / 2)

def hexagonal(n): return int(n * (2 * n - 1))

def heptagonal(n): return int((n * (5 * n - 3)) / 2)

def octagonal(n): return int(n * (3 * n - 2))

funcs = { 3: triangle, 4: square, 5: pentagonal, 6: hexagonal, 7: heptagonal, 8: octagonal }

def connects(l, r):
    return str(l)[2:] == str(r)[:2]

def aSequence(initial, previous, depth, endDepth, limit):
    f = funcs[depth]

    for i in range(2, limit):
        n = f(i)
        if len(str(n)) < 4: continue
        if len(str(n)) > 4: return None
        print("".join(["  "] * (depth - 3)), depth, i, "Checking", n)
        if connects(previous, n):
            print("".join(["  "] * (depth - 3)), "Connects:", previous, n)
            if depth == endDepth:
                if connects(n, initial) and n != initial:
                    return [n]
            else:
                seq = aSequence(initial, n, depth + 1, endDepth, limit)
                if seq != None:
                    possibleSol = [n] + seq
                    if len(possibleSol) == len(set(possibleSol)):
                        return possibleSol
        else:
            continue

    return None

if __name__ == "__main__":
    # Your code here!

    limit = 10 ** 4
    endDepth = 5

    for i in range(100, limit):
        n = triangle(i)
        if len(str(n)) > 4: break
        print("Checking: ", n)
        possibleSol = aSequence(n, n, 4, endDepth, limit)
        if possibleSol != None:
            print([n] + possibleSol)
