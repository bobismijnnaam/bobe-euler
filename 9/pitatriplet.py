for a in range(1, 1000):
	for b in range(a + 1, 1000):
		c = 1000 - a - b
		if a + b + c == 1000:
			if a * a + b * b == c * c:
				print(str(a * b * c))
				print("found!");
				exit()
