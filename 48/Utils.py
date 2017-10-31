#!/usr/bin/env python3

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
        self.number[0] += factor
        
        self.skim();

    def mul(self, factor):
        for i in range(0, len(self.number)):
            self.number[i] *= factor

        self.skim()

    def pow(self, factor):
        if factor < 0:
            raise NotImplementedError("Negative powers not supported")

        if type(factor) == type(0.1) and not factor.is_integer():
            raise NotImplementedError("Non-integer powers not supported")

        if factor == 0:
            self.numbers = [1]
            return

        oldSelf = self.clone()

        for _ in range(factor - 1):
            self.bigMul(oldSelf)

    def bigAdd(self, bigInt):
        if len(self.number) < len(bigInt.number):
            self.number += [0] * (len(bigInt.number) - len(self.number))

        for (i, v) in enumerate(bigInt.number):
            self.number[i] += bigInt.number[i]

        self.skim()

    def bigMul(self, bigFactor):
        # Get all the multiplication factors
        facts = bigFactor.getNumberArray()

        total = BigInt()

        # For each factor...
        for (i, v) in enumerate(facts):
            digitSelf = self.clone()

            # If v is zero, skip it, because then the order should be skipped
            if v == 0:
                continue

            # Make a copy of the original
            digitSelf = self.clone()
            # Shift it the amount of places of the current digit
            digitSelf.shift(i)

            # If v is more than zero, multiply
            if v > 1:
                digitSelf.mul(v)
            
            total.bigAdd(digitSelf)

        # Set the end result
        self.number = total.number
    
    def getNumberArray(self):
        return list(self.number)
    
    def toString(self):
            result = ""

            for i in self.number:
                    result += str(i)

            return result[::-1]

    def clone(self):
        newSelf = BigInt()
        newSelf.number = self.getNumberArray()
        return newSelf

    def shift(self, n):
        if n == 0:
            return

        if n < 0:
            raise NotImplementedError("Negative shifts are not yet implemented")

        oldLen = len(self.number)
        self.number += [0] * n
        
        for i in range(len(self.number) - 1, n - 1, -1):
            self.number[i] = self.number[i - n]
            self.number[i - n] = 0

    def take(self, n):
        if n == 0:
            self.number = [0]

        if n < 0:
            raise ValueError("Non-negative takes are not supported")

        self.number = self.number[:n]

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

class NumberJuggler:
    def __init__(self, lim):
        print("Generating prime lookup table")
        self.primeTable = generatePrimeTable(lim)
        print("Generating prime list")
        self.primeList = [i for i, b in enumerate(self.primeTable) if b]
        print("Finished initializing number juggler")

    def getFactorization(self, num):
        factorisation = collections.defaultdict(int)
        countdown = num

        for prime in self.primeList:
            if countdown == 1: break

            while countdown % prime == 0:
                countdown = countdown // prime
                factorisation[prime] += 1

        return factorisation

    def getFactors(self, num):
        factorisation = self.getFactorization(num)
        result = []

        for k, v in factorisation.items():
            result.extend([k] * v)

        return result
    
    def getPrimeFactors(self, num):
        return list(self.getFactorization(num).keys())

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

def simplifyFraction(nj, numerator, denominator):
    if denominator == 0:
        return (0, 0)
    if numerator == 0:
        return (0, 0)

    numFactors = nj.getFactors(numerator)
    denFactors = nj.getFactors(denominator)

    i = 0
    while i < len(denFactors):
        currFactor = denFactors[i]
        if currFactor in denFactors and currFactor in numFactors:
            denFactors.remove(currFactor)
            numFactors.remove(currFactor)
        else:
            i += 1
    
    newNumerator = 1
    for f in numFactors:
        newNumerator *= f
    
    newDenominator = 1
    for f in denFactors:
        newDenominator *= f

    return (newNumerator, newDenominator)

def isPandigital(num):
    numStr = str(num)
    seen = [False] * len(numStr)
    total = 0
    for c in numStr:
        cInt = int(c)
        if cInt < 1 or cInt > len(numStr):
            total = -1
            break
        if not seen[cInt - 1]:
            total += 1
            seen[cInt - 1] = True
        else:
            total = -1 
            break

    return total == len(numStr)

def generatePermutations(elements):
    allPerms = []
    
    if len(elements) == 1:
        return [elements]

    for i in range(0, len(elements)):
        lessElements = list(elements)
        del lessElements[i]
        partialPerms = generatePermutations(lessElements)
        for perm in partialPerms:
            allPerms.append([elements[i]] + perm)

    return allPerms

if __name__ == "__main__":
    print("Unit testing!")

    print("Tests for BigInt")

    bi = BigInt()
    bi.add(123)
    assert(bi.toString() == "123")

    bi.shift(3)
    assert(bi.toString() == "123000")

    bi = BigInt()
    bi.add(50)
    bi.mul(5)
    assert(bi.toString() == "250")

    ba = BigInt()
    ba.add(200)

    bb = BigInt()
    bb.add(12345)

    bb.bigAdd(ba)
    assert(bb.toString() == str(12345 + 200))

    ba = BigInt()
    ba.add(12345)

    bb = BigInt()
    bb.add(67890)

    bb.bigMul(ba)
    assert(bb.toString() == str(12345 * 67890))

    ba = BigInt()
    ba.add(3)

    bb = BigInt()
    bb.add(3)

    ba.bigMul(bb)
    ba.bigMul(bb)

    assert(ba.toString() == "27")

    bi = BigInt()
    bi.add(3)
    bi.pow(3)
    print(bi.number)
    print(bi.toString())
    assert(bi.toString() == "27")

    bi = BigInt()
    bi.add(80)
    bi.pow(80)
    assert(bi.toString() == str(80 ** 80))
