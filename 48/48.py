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
        aggregator = BigInt()
        aggregator.add(i)

        print("Powing...")
        for j in range(i - 1):
            aggregator.mul(i)
            aggregator.take(10)

        print("Adding...")
        total.bigAdd(aggregator)
        total.take(10)

    assert("9110846700" == total.toString()[-10:])
    print("Okay:", total.toString()[-10:])
