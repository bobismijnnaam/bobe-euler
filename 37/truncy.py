import Utils

nj = Utils.NumberJuggler(2000000);

total = 0

for primeInt in nj.primeList:
    prime = str(primeInt)
    l = len(prime)

    if l < 2: continue

    allOK = True;
    for i in range(1, l):
        shortenedL = int(prime[i:])
        shortenedR = int(prime[:i])
        if not nj.primeTable[shortenedL] or not nj.primeTable[shortenedR]:
            allOK = False
            break

    if allOK:
        print(primeInt)
        total += primeInt;

print("total: " + str(total))
