#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    # Your code here!

    limit = 50000
    count = 0

    for n in range(1, limit + 1):
        # print("Checking", n)
        p = 1
        while True:
            # print("\tPow", p)
            nPow = int(n ** p)
            # print("\tRes", nPow)
            if len(str(nPow)) == p:
                print("Found:", n, "**", p, "=", nPow)
                count += 1

            # if len(str(nPow)) > p:
                # break

            p += 1
            
            if p > 100: break


    print("Total count:", count)
