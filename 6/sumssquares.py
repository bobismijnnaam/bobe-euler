left = range(1, 100 + 1)
right = list(left)

total = 0

for l in left:
	for r in right:
		if l != r:
			total += l * r

print(str(total))
