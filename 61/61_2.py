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

# def aSequence(initial, previous, depth, endDepth, limit):
    # f = funcs[depth]

    # for i in range(2, limit):
        # n = f(i)
        # if len(str(n)) < 4: continue
        # if len(str(n)) > 4: return None
        # print("".join(["  "] * (depth - 3)), depth, i, "Checking", n)
        # if connects(previous, n):
            # print("".join(["  "] * (depth - 3)), "Connects:", previous, n)
            # if depth == endDepth:
                # if connects(n, initial) and n != initial:
                    # return [n]
            # else:
                # seq = aSequence(initial, n, depth + 1, endDepth, limit)
                # if seq != None:
                    # possibleSol = [n] + seq
                    # if len(possibleSol) == len(set(possibleSol)):
                        # return possibleSol
        # else:
            # continue

    # return None

def aSequence(initial, previous, leftovers):
    if len(leftovers) == 0: 
        if connects(previous, initial):
            return []
        else:
            return None

    for d, ns in leftovers.items():
        for n in ns:
            if connects(previous, n):
                leftoversNext = dict(leftovers)
                del leftoversNext[d]

                possibleSol = aSequence(initial, n, leftoversNext)
                if possibleSol != None:
                    return [n] + possibleSol

if __name__ == "__main__":
    # Your code here!

    limit = 10 ** 4
    endDepth = 8
    
    nums = {}

    for i in range(3, endDepth + 1):
        nums[i] = []

        for j in range(2, limit):
            n = funcs[i](j)
            if len(str(n)) > 4: break
            if len(str(n)) == 4: nums[i] += [n]

    for d, ns in nums.items():
        for n in ns:
            numsNext = dict(nums)
            del numsNext[d]

            possibleSol = aSequence(n, n, numsNext)
            if possibleSol != None:
                possibleSol = [n] + possibleSol
                print("Solution:", possibleSol)
                print(sum(possibleSol))

    
