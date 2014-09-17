primset = list(range(3, 2000000,2))
primset.append(2)
ctr = 0

while ctr < len(primset): 
	currPrim = primset[ctr]
	for n in primset:
		if n % currPrim == 0 and currPrim != n:
			primset.remove(n)
	
	ctr += 1
	print("Size: " + str(len(primset)))

total = 0;
for n in primset:
	total += n
print("Result: " + str(total))
