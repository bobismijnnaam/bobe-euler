# Can speed up by caching

def factorial(n):
	total = 1
	i = n
	while i > 1:
		total *= i
		i -= 1
	return total

totalTotal = 0
for n in range(10, 2000000):
	nList = list(str(n))
	for i in range(0, len(nList)):
		nList[i] = int(nList[i])

	total = 0
	for num in nList:
		total += factorial(num)
	
	if total == n:
		print(n)
		totalTotal += total

print(totalTotal)
