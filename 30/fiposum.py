total = 0

for num in range(2, 1000000):
	if num % 1000 == 0:
		print(num)

	numStr = str(num)
	numTotal = 0
	for char in numStr:
		numTotal += int(char)**5
	if num == numTotal:
		total += num

print(total)
