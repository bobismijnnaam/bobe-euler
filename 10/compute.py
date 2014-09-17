with open("primes.txt") as f:
	primes = f.readlines();

total = 0

for prime in primes:
	total += int(prime)

print(total)
