#!/usr/bin/env python3

from Utils import *

def isOkay(ps, p1, p2):
    newP1 = int(str(p1) + str(p2))
    newP2 = int(str(p2) + str(p1))
    return (newP1 in ps or isPrime(newP1)) and (newP2 in ps or isPrime(newP2))

if __name__ == "__main__":
    # Your code here!
    limit = 1000000
    nj = NumberJuggler(limit)
    pl = nj.primeList
    ps = set(pl)

    psize = len(pl)
    candidates = []

    for a in range(psize):
        pa = pl[a]

        print(a, pa)

        for b in range(a + 1, psize):
            pb = pl[b]
            
            if not isOkay(ps, pa, pb): continue

            for c in range(b + 1, psize):
                pc = pl[c]

                if not isOkay(ps, pa, pc) or not isOkay(ps, pb, pc): continue

                for d in range(c + 1, psize):
                    pd = pl[d]

                    if not isOkay(ps, pa, pd) or not isOkay(ps, pb, pd) or not isOkay(ps, pc, pd): continue

                    for e in range(d + 1, psize):
                        pe = pl[e]

                        if not isOkay(ps, pa, pe) or not isOkay(ps, pb, pe) or not isOkay(ps, pc, pe) or not isOkay(ps, pd, pe): continue

                        primes = [pl[a], pl[b], pl[c], pl[d], pl[e]]
                        # okay = True
                        # for i, p1 in enumerate(primes):
                            # for p2 in primes[i+1:]:
                                # okay = okay and isOkay(ps, p1, p2)
                                # if not okay: break
                            # if not okay: break

                        # if okay:
                        print(a, b, c, d, e)
                        print("Okay!", primes, sum(primes))
                        # exit()
                        candidates += [primes]
