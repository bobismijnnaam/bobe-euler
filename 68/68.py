#!/usr/bin/env python3

from Utils import *

def addSide(order):
    newOrder = [order[-1] + 1, order[-1], order[-1] + 2]
    return order + newOrder

def closeSide(order):
    endOrder = [order[-1] + 1, order[-1], order[1]]
    return order + endOrder

def generateGon(n):
    gon = [0, 1, 2]
    n = n - 2
    for _ in range(n):
        gon = addSide(gon)

    return closeSide(gon)

def isValidGon(gon):
    for i in range(3, len(gon), 3):
        if gon[0] > gon[i]:
            return False

    return True

def isMagic(gon):
    spokeSize = sum(gon[0:3])
    for i in range(0, len(gon), 3):
        if sum(gon[i:i+3]) != spokeSize:
            return False

    return True

if __name__ == "__main__":
    # Your code here!

    gon = [0, 1, 2]
    gon3 = closeSide(addSide(gon))
    print(gon3)
    print(generateGon(3))
    print(generateGon(4))
    print(generateGon(5))

    gonSize = 3
    maxNum = 6

    gonSize = 5
    maxNum = 10

    gonAssignment = generateGon(gonSize)

    print("---------------")

    maxGon = -1

    for nums in permutations(range(1, maxNum + 1)):
        gon = [nums[i] for i in gonAssignment]
        spoke0 = sum(gon[0:3])
        if isValidGon(gon) and isMagic(gon):
            print(spoke0, gon)
            gonStr = "".join([str(x) for x in gon])
            gonNum = int(gonStr)
            if gonNum > maxGon and len(gonStr) == 16:
                maxGon = gonNum

    print("Max gon:", maxGon)

    28797161103104548
