#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    # Your code here!

    maxSum = -1
    for a in range(100):
        print("a =", a)
        for b in range(100):
            num = BigInt()
            num.add(a)
            num.pow(b)

            digitSum = sum([int(x) for x in list(num.toString())])
            if digitSum > maxSum:
                maxSum = digitSum

    print("Max", maxSum)
