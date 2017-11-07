#!/usr/bin/env python3

from Utils import *

def calculateForSteps(numIterations):
    assert(numIterations > 0)

    num = (1, 2)
    for i in range(numIterations - 1):
        num = (num[0] + num[1] * 2, num[1])
        num = (num[1], num[0])

    return (num[0] + num[1], num[1])

if __name__ == "__main__":
    # Your code here!
    print(calculateForSteps(1))
    print(calculateForSteps(2))
    print(calculateForSteps(3))
    print(calculateForSteps(4))

    count = 0
    for i in range(1, 1000 + 1):
        res = calculateForSteps(i)
        numerator = res[0]
        denominator = res[1]

        if len(str(numerator)) > len(str(denominator)):
            count += 1

    print("Count:", count)
