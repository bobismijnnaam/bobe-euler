print("Allocating")
cache = [0] * 1000000
print("Starting search")

for startN in range(999999, 1, -1):
	if startN % 1000 == 0:
		print(str(startN))
	
	if cache[startN] != 0:
		pass
	else:
		nums = []
		n = startN
		seq = 1
		
		while n != 1:
			nums.append(n)

			if n % 2 == 0:
				n = int(n / 2)
			else:
				n = 3 * n + 1
			
			seq += 1
		
		for i in range(0, len(nums)):
			if nums[i] < 1000000:
				cache[nums[i]] = seq
			seq -= 1

longestN = 1
longestSeq = 1

for i in range(1, 1000000):
    if cache[i] > longestSeq:
        longestN = i
        longestSeq = cache[i]

print(str(longestN) + ": " + str(longestSeq))


