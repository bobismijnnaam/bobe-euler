#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    # Your code here!
    limit = 1000000
    for i in range(1, limit):
        baseSet = set(list(str(i)))
        okay = True

        for prefix in range(2, 6 + 1):
            compareSet = set(list(str(prefix * i)))
            if not baseSet == compareSet:
                okay = False
                break

        if okay:
            print("Found:", i)
            break

