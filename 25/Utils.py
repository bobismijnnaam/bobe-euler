import collections

class BigInt:
	def __init__(self):
		self.number = [0]
	
	def skim(self):
		carrier = 0

		for i in range(0, len(self.number)):
			self.number[i] += carrier
			head = self.number[i] % 10
			carrier = (self.number[i] - head) / 10
			self.number[i] = int(head)

		while carrier != 0:
			head = carrier % 10
			carrier = (carrier - head) / 10
			self.number.append(int(head)) 

	
	def add(self, factor):
		if type(factor) is int:
			self.number[0] += factor
		elif type(factor) is BigInt:
			other = factor.getNumberArray()
			if (len(other) <= len(self.number)):
				for i in range(0, len(other)):
					self.number[i] += other[i]
			else:
				border = len(self.number)
				for i in range(0, border):
					self.number[i] += other[i]
				self.number.extend(other[border:])
		else:
			print("Error, cannot add type " + type(factor) + " to BigInt")
			exit()

		self.skim();

	# TODO: Add multiplying with BigInt (like add)
	def mul(self, factor):
		for i in range(0, len(self.number)):
			self.number[i] *= factor

		self.skim()
	
	def getNumberArray(self):
		return list(self.number)

	def __len__(self):
		return len(self.number)
	
	def	toString(self):
		result = ""

		for i in self.number:
			result += str(i)

		return result

class Vector:
	def __init__(self, capacity):
		self.arr = [None] * capacity
		self.size = 0
	
	def get(self, p):
		return self.arr[p]
	
	def push(self, e):
		self.arr[size] = e
		size += 1
	
	def __len__(self):
		return self.size

class NumberJuggler:
	def __init__(self):
		with open("primes.txt") as f:
			content = f.readlines()
			primes = []
			for line in content:
				primes.append(int(line))

			self.primes = primes
	
	def getFactorization(self, num):
		factorisation = collections.defaultdict(int)
		countdown = num

		for prime in self.primes:
			if countdown == 1: break

			while countdown % prime == 0:
				countdown = countdown // prime
				factorisation[prime] += 1

		return factorisation
	
	def getPrimeFactors(self, num):
		return list(getFactorization(num).keys())

	def getDivisors(self, num):
		if num == 1: return [1] 
		
		factorization = self.getFactorization(num)
		factors = list(factorization.keys())
		factorCounts = [0] * len(factors)
		factorCounts[0] = 1

		run = True
		divisors = [1]
	

		while run:
			divisor = 1;
			for j in range(0, len(factors)):
				if factorCounts[j] != 0:
					divisor *= factors[j]**factorCounts[j]
			
			if divisor != num:
				divisors.append(divisor)

			factorCounts[0] += 1
			for j in range(0, len(factorCounts)):
				if factorCounts[j] == factorization[factors[j]] + 1:
					if j == len(factorCounts) - 1:
						run = False
						break
					else:
						factorCounts[j] = 0;
						factorCounts[j + 1] += 1
			
		return divisors

def mergeSort(array):
	if len(array) <= 1:
		return array[:]
	else:
		mid = len(array) // 2

		left = mergeSort(array[:mid])
		right = mergeSort(array[mid:])
		result = []

		while len(left) > 0 and len(right) > 0:
			if left[0] < right[0]:
				result.append(left.pop(0))
			else:
				result.append(right.pop(0))

		if len(left) > 0:
			result.extend(left)
		elif len(right) > 0:
			result.extend(right)

		return result

def removeDupsOrdered(array):
	prev = array[0]
	result = [prev]

	for e in array[1:]:
		if e != prev:
			prev = e
			result.append(e)
	
	return result

