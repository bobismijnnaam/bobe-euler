import math

allCoins = [1, 2, 5, 10, 20, 50, 100, 200]
allCoins = allCoins[::-1] # This actually makes the calculation almost instant! Hurray for recursion I guess :-)

def getPossibleCombinations(value, possibleCoins):
	# print(value)
	if value == 200: return 1
	if value > 200: return 0

	possibleCombinations = 0
	myCoin = possibleCoins[0]
	hisCoins = possibleCoins[1:]
	distance = 200 - value

	if len(hisCoins) > 0:
		for i in range(0, int(math.ceil(distance / myCoin)) + 1):
			iterationValue = value + i * myCoin
			possibleCombinations += getPossibleCombinations(iterationValue, hisCoins)
	else:
		for i in range(0, int(math.ceil(distance / myCoin)) + 1):
			iterationValue = value + i * myCoin
			if iterationValue == 200:
				possibleCombinations += 1
	
	# print(str(value) + ":" + str(possibleCombinations))
	return possibleCombinations

print(getPossibleCombinations(0, allCoins))
