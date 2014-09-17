go = True
left = 1
right = 2
total = 2

while go:
	fib = left + right
	if fib >= 4000000:
		go = False
	else:
		if fib % 2 == 0:
			total += fib
		left = right
		right = fib

print(str(total))
