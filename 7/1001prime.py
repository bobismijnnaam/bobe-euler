import math

primes = [2, 3, 5, 7, 11, 13]
currNum = 13

def isPrime(num):
	if num % 2 == 0:
		return False
	elif num == 0:
		return False
	elif num == 1:
		return False
	elif num == 2:
		return True
	else:
		for n in primes:
			if num % n == 0:
				return False
		
		return True

while len(primes) != 10001:
	if currNum % 1000 == 0:
		print(str(currNum))
	
	currNum += 2
	if isPrime(currNum):
		primes.append(currNum)

print(str(primes[10000]))
