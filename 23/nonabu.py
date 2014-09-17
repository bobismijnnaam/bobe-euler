import Utils
import math

nj = Utils.NumberJuggler()

maxNum = 28123 + 1
abundants = []
nonabundantSum = 0
isAbundantSum = [False] * maxNum

print("Caching abundant numbers")

for i in range(1, maxNum):
	divisors = nj.getDivisors(i)
	if sum(divisors) > i:
		abundants.append(i)

print("Calculating abundant sums < " + str(maxNum))

for i in range(0, len(abundants)):
	left = abundants[i]

	for j in range(i, len(abundants)):
		right = abundants[j]

		if left + right < len(isAbundantSum):
			isAbundantSum[left + right] = True
		else:
			break

print("Finding non-abundant sums < " + str(maxNum))

last = 0
for i in range(0, len(isAbundantSum)):
	if not isAbundantSum[i]:
		nonabundantSum += i
		last = i

print("Sum of nonabundants: " + str(nonabundantSum))
print("Last non-abundant sum: " + str(last))
