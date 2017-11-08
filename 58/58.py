#!/usr/bin/env python3

from Utils import *
import math

def corner(e, size, n):
    assert(n >= 0 and n < 4)
    return e + (size - 1) * (n + 1) - 1

def nextSide(i, size):
    return i + size - 1

def nextEntry(e, size):
    return corner(e, size, 3) + 1

def nextSize(size):
    return size + 2

def isPrime(num):
    if num == 0:
        return False
    elif num == 1:
        return False
    elif num == 2:
        return True
    else:
        for n in range(2, int(math.ceil(math.sqrt(num)) + 1)):
            if num % n == 0:
                return False
        
        return True

if __name__ == "__main__":
    # Your code here!

    # limit = 1000000000
    # nj = NumberJuggler(limit)
    # ps = set(nj.primeList)

    e = 2
    size = 3

    prime = 0
    nonPrime = 0

    i = 0
    # while True:
    for i in range(6):
        i += 1
        # print("Iter", i)
        corners = [corner(e, size, n) for n in range(3)]
        # if corners[0] > limit:
            # print("Error! corner =", corners[0], "limit =", limit)
            # exit()
        print("\tCorners:", corners)
        corners = [x for x in corners if isPrime(x)]
        print("\tPrimes:", corners)
    

        prime += len(corners)
        nonPrime += 4 - len(corners)

        print("new prime:", prime)
        print("new nonPrime:", nonPrime)

        # print("\tPrimes:", prime)
        # print("\tNon primes:", nonPrime)
        print("----")
        print("\tSize:", size)
        print("\te:", e)
        print("\t", prime, " / ", nonPrime + prime, "=", prime / (prime + nonPrime))

        if (prime / (prime + nonPrime)) < 0.10:
            print("Primes:", prime)
            print("Non primes:", nonPrime)
            print(prime, " / ", nonPrime + prime, "=", prime / (prime + nonPrime))
            print("Size:", size)
            print("e:", e)
            break

        e = nextEntry(e, size)
        size = nextSize(size)
