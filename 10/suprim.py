import math

primes = [2, 3, 5, 7, 11, 13]
currNum = 13

def isPrime(num):
	global primes
	
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
			if n * 2 > num:
				# print(str(n) + " * 2 > " + str(num))
				primes.append(num)
				return True
			elif num % n == 0:
				return False

		primes.append(num)
		return True

while currNum != 2000000:
	if currNum % 1001 == 0:
		print(str(currNum) + ":" + str(len(primes)) + ":highest=" + str(primes[len(primes) - 1]))
	
	currNum += 2
	isPrime(currNum)

primsum = 0
for n in primes:
	primsum += n

print(str(primsum))

