from Utils import Vector

primes = Vector(2000000)
primes.push(2)
primes.push(3)
primes.push(5)
primes.push(7)
primes.push(11)

def isPrime(n):
	if n == 1:
		return False
	elif n == 2:
		return True
	elif n % 2 == 0:
		return False
	else:
		for i in range(0, len(primes)):
			if n % primes.get(i) == 0:
				return False
		primes.push(n)
		return True

total = 0
for num in range(13, 2000000, 2):
	if (num - 1) % 1000 == 0:
		print(str(num) + ":" + str(len(primes)))
	if isPrime(num):
		total += num

for i in range(0, len(primes)):
	total += primes.get(i)

print ("Result: " + str(total))
