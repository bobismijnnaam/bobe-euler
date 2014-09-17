import BigInt

print("Starting adding")

base = 2
power = 1000

import BigInt

num = BigInt()
num.add(1)

for i in range(0, power):
	
	num.mul(base)

	'''
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
	'''

	print("Inbetween sum: " + num.toString())

totalSum = 0
for c in num.getNumberArray():
	totalSum += c

print(str(totalSum) + " should be 1366" )
