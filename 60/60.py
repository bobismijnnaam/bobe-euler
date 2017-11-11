#!/usr/bin/env python3

# Generating prime lookup table
# Generating prime list
# Finished initializing number juggler
# 1 3 142 11428 72218
# Okay! [3, 7, 823, 121441, 912763] 1035037
# New minimum: 1035037
# Progress: 1.2739178068231038e-05
# 1 3 202 39340 77970
# Okay! [3, 7, 1237, 471439, 992689] 1465375
# 1 3 2181 8108 29481
# Okay! [3, 7, 19237, 83023, 343771] 446041
# New minimum: 446041
# Progress: 1.2739178068231038e-05
# 1 3 2401 20349 25379
# Okay! [3, 7, 21397, 229003, 291901] 542311
# 1 3 5231 9265 24165
# Okay! [3, 7, 51133, 96181, 276517] 423841
# New minimum: 423841
# Progress: 1.2739178068231038e-05
# 1 10 508 21917 33015
# Okay! [3, 31, 3637, 248473, 389401] 641545
# 1 10 572 1982 26770
# Okay! [3, 31, 4159, 17209, 309571] 330973
# New minimum: 330973
# Progress: 1.2739178068231038e-05
# 1 11 18 777 17510
# Okay! [3, 37, 67, 5923, 194119] 200149
# New minimum: 200149
# Progress: 1.2739178068231038e-05

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
    minimumFound = 5 * limit

    for a in range(psize):
        pa = pl[a]

        if pa > minimumFound: continue

        for b in range(a + 1, psize):
            pb = pl[b]
            
            if pb > minimumFound: continue
            if not isOkay(ps, pa, pb): continue

            for c in range(b + 1, psize):
                pc = pl[c]

                if pc > minimumFound: continue
                if not isOkay(ps, pa, pc) or not isOkay(ps, pb, pc): continue

                for d in range(c + 1, psize):
                    pd = pl[d]

                    if pd > minimumFound: continue
                    if not isOkay(ps, pa, pd) or not isOkay(ps, pb, pd) or not isOkay(ps, pc, pd): continue

                    for e in range(d + 1, psize):
                        pe = pl[e]

                        if pe > minimumFound: continue
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
                        total = sum(primes)
                        if total < minimumFound:
                            minimumFound = total
                            print("New minimum:", total)
                            print("Progress:", a/psize)
