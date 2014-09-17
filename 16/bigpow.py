print("Starting adding")

total = [1]
base = 2
power = 1000

for i in range(0, power):

	for i in range(0, len(total)):
		total[i] *= base
	
	carrier = 0
	for i in range(0, len(total)):
		total[i] += carrier
		head = total[i] % 10
		carrier = (total[i] - head) / 10
		total[i] = int(head)
	
	while carrier != 0:
		head = carrier % 10;
		carrier = (carrier - head) / 10
		total.append(int(head))

	totalTemp = total[::-1]
	print("Inbetween sum: ", end="")
	for i in range(0, len(totalTemp)):
		print(totalTemp[i], end="")
	print()


totalSum = 0
for c in total:
	totalSum += c

print(totalSum)
