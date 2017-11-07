#!/usr/bin/env python3

from Utils import *
from math import *

# http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/cfINTRO.html#section6
# See the HTML, part 6 for an explanation of the algorithm
# Step will do one iteration
# Given an a, b, c, s.t.:
#
#     sqrt(a) + b
# x = -----------
#          c
#
# step wil return (m, (a, d, e)), s.t.:
#
#      sqrt(a) + f
# x' = -----------
#           e
#
# where:
#
# m = floor(sqrt(x))
# d = b - m * c
# f = -d
# e = a - d^2
#     -------
#        c
#
def step(a, b, c):
    x = (sqrt(a) + b) / c
    m = floor(x)


    d = b - m * c
    f = -d
    e = (a - d ** 2) / c

    return (m, (a, f, e))
    
def continuedFractionsOfSquareRootOf(a):
    a = a
    b = 0
    c = 1

    ms = []

    (_, (firstA, firstB, _)) = step(a, b, c)

    # print("----")

    while True:
        res = step(a, b, c)
        # print(res)
        (m_, (a_, b_, c_)) = res

        a = a_
        b = b_
        c = c_

        ms += [m_]
        
        if a == firstA and b == firstB and c == 1: break

    ms += [int(b + ms[0])]

    # print(ms)
    return ms

if __name__ == "__main__":
    # Your code here!
    print(step(14, 0, 1))
    print(step(14, 3, 5))

    # a = 67
    # b = 0
    # c = 1

    # ms = []

    # (_, (firstA, firstB, _)) = step(a, b, c)

    # print("----")

    # while True:
        # res = step(a, b, c)
        # print(res)
        # (m_, (a_, b_, c_)) = res

        # a = a_
        # b = b_
        # c = c_

        # ms += [m_]
        
        # if a == firstA and b == firstB and c == 1: break

    # ms += [int(b + ms[0])]

    # print(ms)

    count = 0
    for i in range(1, 10000 + 1):
        if sqrt(i).is_integer():
            continue
        
        if ((len(continuedFractionsOfSquareRootOf(i)) - 1) % 2) == 1:
            count += 1

        # print(i, ":", continuedFractionsOfSquareRootOf(i))

    print(count)

