#!/usr/bin/env python3

from Utils import *

def isPalindromic(num):
    num = str(num)
    return num == num[::-1]

def lychrelIteration(num):
    num = str(num)
    mun = num[::-1]
    return int(num) + int (mun)

def isLychrel(num):
    for i in range(50):
        num = lychrelIteration(num)
        if isPalindromic(num): return False

    return True

if __name__ == "__main__":
    # Your code here!
    print(isLychrel(10677))
    print(isLychrel(47))
    print(isLychrel(349))

    count = 0
    for i in range(10000):
        if isLychrel(i):
            count += 1

    print("Count", count)
