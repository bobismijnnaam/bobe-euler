#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    total = BigInt()
    
    for i in range(1, 10 + 1):
        print("Doing", i)
        bi = BigInt()
        bi.add(i)
        bi.pow(i)
        total.bigAdd(bi)

    print(total.toString())
    assert(total.toString() == "10405071317")

    total = BigInt()

    for i in range(1, 1000 + 1):
        print("Doing", i)
        bi = BigInt()
        bi.add(i)
        print("\tPowing...")
        bi.smartPow(i)
        print("\tAdding...")
        total.bigAdd(bi)

    print(total.toString()[-10:])
