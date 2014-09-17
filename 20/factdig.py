import BigInt 

num = BigInt.BigInt()
num.add(1)

for i in range(1, 101):
	num.mul(i)

numArray = num.getNumberArray()
total = 0
for i in numArray:
	total += i

print(total)
