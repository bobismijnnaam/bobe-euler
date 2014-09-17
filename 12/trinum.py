import time
import collections

trinum = 0;
trictr = 1;

def nextTriNum():
	global trinum
	global trictr

	trinum += trictr
	trictr += 1
	return trinum

# def getDivisors(num):
# 	ctr = 1
# 
# 	for div in range(0, num // 2 + 3):
# 		if (num % (div + 1)) == 0:
# 			ctr += 1
# 	
# 	return ctr

primes = []
with open("primes.txt") as f:
	contents = f.readlines()
	for num in contents:
		primes.append(int(num))

def getDivisors(num):
	progress = num
	aggro = collections.defaultdict(int)

	for n in primes:
		while progress % n == 0:
			progress /= n
			aggro[n] += 1

		if progress == 1:
			break;
	
	divisors = 1
	for k, v in aggro.items():
		divisors *= v + 1
	
	return divisors

num = 0
numberCounter = 0
while True:
	num = nextTriNum()
	divs = getDivisors(num)

	if numberCounter % 10 == 0:
		print(str(num) + ":" + str(divs))

	if getDivisors(num) > 500:
		break;

	numberCounter += 1

print(num)
