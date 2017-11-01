#!/usr/bin/env python3

from Utils import *

if __name__ == "__main__":
    nj = NumberJuggler(10000)
    for i in range(len(nj.primeList)):
        prime1 = nj.primeList[i]

        if not len(str(prime1)) == 4: continue

        for j in range(i + 1, len(nj.primeList)):
            prime2 = nj.primeList[j]

            if not len(str(prime2)) == 4: continue
            if not isPermutationOf(prime1, prime2): continue

            for k in range(j + 1, len(nj.primeList)):
                prime3 = nj.primeList[k]

                # print(i, j, k)
                if not len(str(prime3)) == 4: continue
                if not isPermutationOf(prime2, prime3): continue

                if (prime2 - prime1) == (prime3 - prime2):
                    print("Found:", prime1, prime2, prime3)
                    print(str(prime1) + str(prime2) + str(prime3))
