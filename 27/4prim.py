def generatePrimeTable(lim):
	numbers = [True] * lim
	numbers[0] = False
	numbers[1] = False

	currNum = 4
	while currNum < lim:
		numbers[currNum] = False
		currNum += 2

	prime = 3

	while prime < lim:
		if numbers[prime]:
			currNum = prime
			currNum += prime
			while currNum < lim:
				numbers[currNum] = False
				currNum += prime

		prime += 2
	
	return numbers

print("Generating table")

primeTable = generatePrimeTable(6000000)

print("Looking for product")

longestLength = 0
longestProduct = 0
for a in range(-999, 1000):
	for b in range(-999, 1000):
		n = -1
		val = 3
		length = -1
		while primeTable[val]:
			length += 1
			n += 1
			val = n**2 + a * n + b
		if length > longestLength:
			longestLength = length
			longestProduct = a * b

print (longestProduct)
