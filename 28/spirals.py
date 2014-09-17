total = 1

ptr = 1

# print(list(range(7, 1001 + 1, 2)))
for size in range(3, 1001 + 1, 2):
	dist = size - 1
	for i in range(0, 4):
		ptr += dist
		total += ptr
		print(ptr)
	print("---")

print(total)
