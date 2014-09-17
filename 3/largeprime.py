import math

target = 600851475143

def divides(num, div):
	result = num / float(div);
	return result == math.floor(result)

def isPrime(num):
	if num == 0:
		return False
	elif num == 1:
		return False
	elif num == 2:
		return True
	else:
		for n in range(2, int(math.ceil(num / 2.0) + 1)):
			if divides(num, n):
				return False
		
		return True

if isPrime(5):
	print("5 is prime")

if not isPrime(6):
	print("6 is not prime")

if isPrime(3):
	print("3 is prime")

if not isPrime(4):
	print("4 is not prime")

progress = 1
primefactor = 1;
ctr = 1;
whileTgt = int(math.ceil(target / 2.0) + 1)

# for x in range(1, int(math.ceil(target / 2.0) + 1)):
while ctr != whileTgt:
	if divides(ctr, 1000):
		print("ctr = " + str(ctr))
	if isPrime(ctr):
		if divides(target, ctr):
			progress *= ctr;
			primefactor = ctr;
	if progress == target:
		break;

	ctr += 1

print(str(primefactor))
