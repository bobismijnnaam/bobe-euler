import Utils
from math import ceil, sqrt

nj = Utils.NumberJuggler(5000000)

def quickPrimeCheck(num):
    isPrime = True
    bound = int(ceil(sqrt(num)))
    for prime in nj.primeList:
        if prime > bound:
            break;
        
        if num % prime == 0:
            isPrime = False
            break

    return isPrime

if quickPrimeCheck(2143):
    print("double ok")

possibilities = []
for r in range(2, 10):
    possibilities.extend(Utils.generatePermutations(range(1, r)));

result = -1;
panprim = []
for possibility in possibilities:
    s = int(''.join(map(str, possibility)))
    if quickPrimeCheck(s):
        panprim.append(s)
        if s > result:
            result = s;
            print("pandigital prime: " + str(s))

print("max: " + str(result))
print(panprim)
