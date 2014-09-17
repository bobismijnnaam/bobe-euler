from Utils import BigInt
from collections import defaultdict

"""
def bigFibonacci(fibNum, cacheDict):
	if fibNum < 2:
		returnValue = BigInt()
		returnValue.add(fibNum)
		return returnValue
	else:
		if cacheDict[fibNum] == None:
			left = bigFibonacci(fibNum - 1, cacheDict)
			right = bigFibonacci(fibNum - 2, cacheDict)
			left.add(right)
			cacheDict[fibNum] = left
			return left
		else:
			return cacheDict[fibNum]
"""

fibSub2 = BigInt()
fibSub2.add(1)

fibSub1 = BigInt()
fibSub1.add(fibSub2)

fibCurr = BigInt()
fibCurr.add(fibSub1)
fibCurr.add(fibSub2)

fibCurrTerm = 3

while len(fibCurr) < 1000:
	fibSub2 = fibSub1
	fibSub1 = fibCurr
	fibCurr = BigInt()
	
	fibCurr.add(fibSub2)
	fibCurr.add(fibSub1)
	fibCurrTerm += 1

result = fibCurr.getNumberArray()
print("Fibonacci #: " + fibCurr.toString())
print("Term #" + str(fibCurrTerm))
